# import tweepy
import os 
from dotenv import load_dotenv

load_dotenv()

# # Set up your API keys
# api_key = os.getenv('TWITTER_API_KEY')
# api_key_secret = os.getenv('TWITTER_API_KEY_SECRET')
# access_token = os.getenv('TWITTER_ACCESS_TOKEN')
# access_token_secret = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')

# # Authenticate with the Twitter API
# auth = tweepy.OAuthHandler(api_key, api_key_secret)
# auth.set_access_token(access_token, access_token_secret)
# api = tweepy.API(auth)

# # Function to get replies to a tweet
# def get_replies(username, tweet_id):
#     replies = []
#     for tweet in tweepy.Cursor(api.search_tweets, q=f'to:{username}', since_id=tweet_id, tweet_mode='extended').items():
#         if hasattr(tweet, 'in_reply_to_status_id_str') and tweet.in_reply_to_status_id_str == tweet_id:
#             replies.append(tweet.full_text)
#     return replies

# # Example: Get replies to a specific tweet
# username = "Imdpk_45"  # Replace with the username of the original tweet
# tweet_id = "1890243873924096343"  # Replace with the tweet ID
# replies = get_replies(username, tweet_id)

# for reply in replies:
#     print(reply)

import requests

url = "https://api.x.com/2/tweets/1890243873924096343"


headers = {f"Authorization: Bearer {os.getenv('TWITTER_BEARER_TOKEN')}"}

response = requests.request("GET", url, headers=headers)

print(response.text)