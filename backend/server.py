from flask import Flask, request, jsonify
from googleapiclient.discovery  import build
from bs4 import BeautifulSoup
import html
import re
from flask_cors import CORS
from urllib.parse import urlparse, parse_qs
import pandas as pd
import numpy as np
from predict import load_model, predict_sentiment
from dotenv import load_dotenv
import os

load_dotenv()

stored_comments = {}  # Store the comments of the video

app = Flask(__name__)
CORS(app)
# API key for the YouTube Data API v3
api_key = os.getenv("SECRET_KEY")
youtube = build('youtube', 'v3', developerKey=api_key)


# Function to clean the text data
def clean_text(text):
    soup = BeautifulSoup(text, 'html.parser')
    cleaned_text = soup.get_text()


    cleaned_text = html.unescape(cleaned_text)

    emoji_pattern = re.compile(
        "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002500-\U00002BEF"  # chinese characters
        u"\U00002702-\U000027B0"  # other symbols
        u"\U00002702-\U000027B0"  # Dingbats
        u"\U0001F926-\U0001F937"  # supplemental symbols
        u"\U0001F1F2-\U0001F1F4"  # Enclosed characters
        u"\U0001F1E6-\U0001F1FF"  # regional indicators
        u"\U0001F600-\U0001F64F"  # more emoticons
        u"\U0001F910-\U0001F93A"  # extended pictographs
        u"\U0001F980-\U0001F9FF"  # extended symbols and animals
        u"\U0001FA70-\U0001FAFF"  # symbols for travel
        "]+", flags=re.UNICODE)

    cleaned_text = emoji_pattern.sub(r'', cleaned_text)  # Remove emojis

    return cleaned_text


# Function to get all the comments of a video
def get_all_comments(youtube, video_id):
    all_comments = []
    next_page_token = None
    

    while True:

        request = youtube.commentThreads().list(
            part='snippet,replies',
            videoId=video_id,
            pageToken=next_page_token,
            maxResults=100
        )
        response = request.execute()
        review_counter=0

        for item in response['items']:
            
            raw_text = item['snippet']['topLevelComment']['snippet']['textDisplay']
            clean_comment_text = clean_text(raw_text)
            review_counter+=1
            comment_data = dict(
                ReviewID= str(review_counter),
                Username=item['snippet']['topLevelComment']['snippet']['authorDisplayName'],
                ReviewText=clean_comment_text,
                Likes=str(item['snippet']['topLevelComment']['snippet']['likeCount']),
            )
            if len(comment_data['ReviewText'])>1:
                all_comments.append(comment_data)

        next_page_token = response.get('nextPageToken')

        if not next_page_token:
            break

    return all_comments





# Function to get the video id from the video url
def extract_video_id(url):
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", url)
    return match.group(1) if match else None

@app.route('/comments', methods=['POST'])
def get_url():
    data = request.json
    video_url = data.get('url')

    # Extract video ID from URL
    video_id = extract_video_id(video_url)
    
    if not video_id:
        return jsonify({'error': 'No valid video ID found in the URL'}), 400

    # Fetch comments
    comments = get_all_comments(youtube, video_id)  # Ensure `youtube` and `get_all_comments` are defined

    if comments is None:
        return jsonify({'error': 'Failed to fetch comments from YouTube'}), 500

    # Save comments to CSV
    csv_file_path = 'reviews.csv'

    try:
        df = pd.DataFrame(comments)
        df.to_csv(csv_file_path, index=False, encoding='utf-8')
    except Exception as e:
        return jsonify({'error': f'Failed to save comments to CSV: {str(e)}'}), 500

    stored_comments[video_id] = comments
    return jsonify({
        'message': 'Comments fetched and stored successfully',
        'comments': comments,
    }), 200


@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    try:
        # Load CSV into DataFrame
        
        model, vectorizer = load_model()
        df = pd.read_csv("reviews.csv")["ReviewText"].values
        predictions = predict_sentiment(df, model, vectorizer)

        # Print predictions
        sentiment_totals = {'neutral': 0, 'positive': 0, 'negative': 0}

        # Count the sentiments
        for sentiment in predictions:
            if sentiment == 'negative':
                sentiment_totals['negative'] += 1
            elif sentiment == 'positive':
                sentiment_totals['positive'] += 1
            else:
                sentiment_totals['neutral'] += 1

        # Calculate total number of reviews
        total_reviews = len(df)

        # Calculate percentages
        sentiment_percentages = {
            'positive': (sentiment_totals['positive'] / total_reviews) * 100,
            'neutral': (sentiment_totals['neutral'] / total_reviews) * 100,
            'negative': (sentiment_totals['negative'] / total_reviews) * 100
        }

        # print(sentiment_percentages)


        
        return jsonify({
            'message': 'Sentiment analysis completed successfully',
            # 'plot_url': f'data:image/png;base64,{plot_url}',
            'sentiment_totals': {
                'neutral': sentiment_percentages['neutral'],
                'positive': sentiment_percentages['positive'],
                'negative': sentiment_percentages['negative'],
            },
            
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)