from flask import Flask, request, jsonify
from googleapiclient.discovery  import build
from bs4 import BeautifulSoup
import html
import re
from flask_cors import CORS
from urllib.parse import urlparse, parse_qs

stored_comments = {}  # Store the comments of the video

app = Flask(__name__)
CORS(app)
# API key for the YouTube Data API v3
api_key = 'AIzaSyAR1pbG-NT53ssivVhzfGxkU2GKR7SLCXQ'
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

        for item in response['items']:
            raw_text = item['snippet']['topLevelComment']['snippet']['textDisplay']
            clean_comment_text = clean_text(raw_text)

            comment_data = dict(
                textDisplay=clean_comment_text,
                likeCount=item['snippet']['topLevelComment']['snippet']['likeCount'],
            )
            all_comments.append(comment_data)

        next_page_token = response.get('nextPageToken')

        if not next_page_token:
            break

    return all_comments



# Function to get the video id from the video url
@app.route('/comments', methods=['POST'])
def get_url():
    data = request.json
    video_url = data.get('url')
    
    try:
        video_id = video_url.split("v=")[1].split("&")[0]
    except IndexError:
        return jsonify({'error': 'No video ID found in the URL'}), 400
    
    if not video_id:
        return jsonify({'error': 'No video ID found in the URL'}), 400

    # Fetch and store comments
    comments = get_all_comments(youtube, video_id)
    if comments is None:
        return jsonify({'error': 'Failed to fetch comments from YouTube'}), 500

    stored_comments[video_id] = comments
    return jsonify({'message': 'Comments fetched and stored successfully', 'comments': comments}), 200

if __name__ == '__main__':
    app.run(debug=True)