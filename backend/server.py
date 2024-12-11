from flask import Flask, request, jsonify
from googleapiclient.discovery  import build
from bs4 import BeautifulSoup
import html
import re
from flask_cors import CORS
from urllib.parse import urlparse, parse_qs
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import nltk
import matplotlib.pyplot as plt
import seaborn as sns
from nltk.sentiment import SentimentIntensityAnalyzer
import os
import io
import base64

stored_comments = {}  # Store the comments of the video

app = Flask(__name__)
CORS(app)
# API key for the YouTube Data API v3
api_key = 'AIzaSyAR1pbG-NT53ssivVhzfGxkU2GKR7SLCXQ'
youtube = build('youtube', 'v3', developerKey=api_key)
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

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
@app.route('/comments', methods=['POST'])
def get_url():
    data = request.json
    print(data)
    video_url = data.get('url')
    
    # Extract video ID from URL
    try:
        video_id = video_url.split("v=")[1].split("&")[0]
    except IndexError:
        return jsonify({'error': 'No video ID found in the URL'}), 400
    
    if not video_id:
        return jsonify({'error': 'No video ID found in the URL'}), 400

    # Fetch comments
    comments = get_all_comments(youtube, video_id)  # You should have `youtube` and `get_all_comments` properly defined.
    if comments is None:
        return jsonify({'error': 'Failed to fetch comments from YouTube'}), 500

    # Save comments to CSV
    csv_file_path = f'reviews.csv'

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
        
        df = pd.read_csv('./reviews.csv')
        
        
        if 'ReviewText' not in df.columns or 'ReviewID' not in df.columns or 'Likes' not in df.columns:
            return jsonify({'error': 'CSV file must contain ReviewText, ReviewID, and Likes columns'}), 400

        # Perform sentiment analysis
        res = {}
        for _, row in df.iterrows():
            
            text = row['ReviewText']
            iid = row['ReviewID']
            temp = sia.polarity_scores(text)
            temp['Likes'] = row['Likes']
            res[iid] = temp

        # Convert results to DataFrame
        vader = pd.DataFrame(res).T.reset_index().rename(columns={'index': 'Id'})

        # Visualization (optional: save as base64)
        # fig, axs = plt.subplots(1, 3, figsize=(12, 3))
        # sns.barplot(data=vader, x='Likes', y='pos', ax=axs[0])
        # sns.barplot(data=vader, x='Likes', y='neu', ax=axs[1])
        # sns.barplot(data=vader, x='Likes', y='neg', ax=axs[2])
        # axs[0].set_title('Positive')
        # axs[1].set_title('Neutral')
        # axs[2].set_title('Negative')
        # plt.tight_layout()

        # Save the plot to a bytes object
        # img = io.BytesIO()
        # plt.savefig(img, format='png')
        # img.seek(0)
        # plot_url = base64.b64encode(img.getvalue()).decode()

        # Prepare pie chart data
        neu_total = sum(entry['neu'] for entry in res.values())
        pos_total = sum(entry['pos'] for entry in res.values())
        neg_total = sum(entry['neg'] for entry in res.values())
        
        return jsonify({
            'vader_results': vader.to_dict(orient='records'),
            # 'plot_url': f'data:image/png;base64,{plot_url}',
            'sentiment_totals': {
                'neutral': neu_total,
                'positive': pos_total,
                'negative': neg_total
            },
            
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)