# backend/server.py
from flask import Flask, request, jsonify
from googleapiclient.discovery import build
from bs4 import BeautifulSoup
import html
import re
from flask_cors import CORS
from urllib.parse import urlparse, parse_qs
import pandas as pd
import numpy as np
import csv
from predict import load_model, predict_sentiment
from dotenv import load_dotenv
import os
import time  # for handling expiry

from comment_translate import translate_text

load_dotenv()

# Store the comments along with the timestamp
stored_comments = {}  # Format: {video_id: {"timestamp": ..., "comments": [...]}}
EXPIRY_SECONDS = 600  # 10 minutes

app = Flask(__name__)
CORS(app)

# API key for the YouTube Data API v3
api_key = os.getenv("SECRET_KEY")
youtube = build('youtube', 'v3', developerKey=api_key)


def clean_text(text):
    soup = BeautifulSoup(text, 'html.parser')
    cleaned_text = soup.get_text()
    cleaned_text = html.unescape(cleaned_text)

    emoji_pattern = re.compile(
        "["u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags
        u"\U00002500-\U00002BEF"  # Chinese characters
        u"\U00002702-\U000027B0"
        u"\U0001F926-\U0001F937"
        u"\U0001F1F2-\U0001F1F4"
        u"\U0001F1E6-\U0001F1FF"
        u"\U0001F910-\U0001F93A"
        u"\U0001F980-\U0001F9FF"
        u"\U0001FA70-\U0001FAFF"
        "]+", flags=re.UNICODE)

    return emoji_pattern.sub(r'', cleaned_text)


def get_all_comments(youtube, video_id):
    all_comments = []
    next_page_token = None
    review_counter = 0

    while True:
        request = youtube.commentThreads().list(
            part='snippet,replies',
            videoId=video_id,
            pageToken=next_page_token,
            maxResults=100
        )
        response = request.execute()

        for item in response['items']:
            raw_text = item['snippet']['topLevelComment']['snippet']['textDisplay']
            clean_comment_text = clean_text(raw_text)
            review_counter += 1
            comment_data = dict(
                ReviewID=str(review_counter),
                Username=item['snippet']['topLevelComment']['snippet']['authorDisplayName'],
                ReviewText=clean_comment_text,
                Likes=str(item['snippet']['topLevelComment']['snippet']['likeCount']),
            )
            if len(comment_data['ReviewText']) > 1:
                all_comments.append(comment_data)

        next_page_token = response.get('nextPageToken')
        if not next_page_token:
            break

    return all_comments


def extract_video_id(url):
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", url)
    return match.group(1) if match else None


@app.route('/comments', methods=['POST'])
def get_url():
    data = request.json
    video_url = data.get('url')
    video_id = extract_video_id(video_url)

    if not video_id:
        return jsonify({'error': 'No valid video ID found in the URL'}), 400

    current_time = time.time()

    # Check if video comments are stored and not expired
    if video_id in stored_comments:
        record = stored_comments[video_id]
        if current_time - record["timestamp"] <= EXPIRY_SECONDS:
            return jsonify({
                'message': 'Comments retrieved from cache',
                'comments': record["comments"]
            }), 200
        else:
            del stored_comments[video_id]  # Expired

    # Fetch comments from YouTube
    comments = get_all_comments(youtube, video_id)
    if comments is None:
        return jsonify({'error': 'Failed to fetch comments from YouTube'}), 500

    # Translate and store
    for comment in comments:
        comment_text = comment['ReviewText']
        translated_text = translate_text(comment_text)
        comment['TranslatedText'] = translated_text

    try:
        df = pd.DataFrame(comments)
        df.to_csv('reviews.csv', index=False, encoding='utf-8')
    except Exception as e:
        return jsonify({'error': f'Failed to save comments to CSV: {str(e)}'}), 500

    stored_comments[video_id] = {
        "timestamp": current_time,
        "comments": comments
    }

    return jsonify({
        'message': 'Comments fetched and stored successfully',
        'comments': comments,
    }), 200


CHAT_LINE_REGEX = re.compile(r'^(\d{1,2}/\d{1,2}/\d{2}), (\d{1,2}:\d{2}) - ([^:]+): (.+)$')


@app.route('/whatsapp/chats', methods=['POST'])
def upload_whatsapp_chat():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if not file.filename.endswith('.txt'):
        return jsonify({'error': 'Only .txt files are accepted'}), 400

    content = file.read().decode('utf-8')
    lines = content.splitlines()

    messages = []
    for line in lines:
        match = CHAT_LINE_REGEX.match(line)
        if match:
            date, time_str, sender, message = match.groups()
            if message.lower().startswith("<media omitted>"):
                continue
            translated_text = translate_text(message)
            messages.append({
                "date": date,
                "time": time_str,
                "sender": sender,
                "message": message,
                "TranslatedText": translated_text
            })

    csv_file = 'reviews.csv'
    file_exists = os.path.isfile(csv_file)
    with open(csv_file, mode='a', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["date", "time", "sender", "message", "TranslatedText"])
        if not file_exists:
            writer.writeheader()
        writer.writerows(messages)

    return jsonify({
        "status": "success",
        "saved_messages": len(messages),
        "messages": messages
    })


@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    try:
        model, vectorizer = load_model()
        df = pd.read_csv("reviews.csv")["TranslatedText"].values
        predictions = predict_sentiment(df, model, vectorizer)

        sentiment_totals = {'neutral': 0, 'positive': 0, 'negative': 0}
        for sentiment in predictions:
            sentiment_totals[sentiment] += 1

        total_reviews = len(df)
        sentiment_percentages = {
            'positive': (sentiment_totals['positive'] / total_reviews) * 100,
            'neutral': (sentiment_totals['neutral'] / total_reviews) * 100,
            'negative': (sentiment_totals['negative'] / total_reviews) * 100
        }

        review_sentiments = [
            {'text': df[i], 'sentiment': predictions[i]}
            for i in range(len(predictions))
        ]

        return jsonify({
            'message': 'Sentiment analysis completed successfully',
            'sentiment_totals': sentiment_percentages,
            'results': review_sentiments
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
