import requests
import uuid
import os
from dotenv import load_dotenv


load_dotenv()

def translate_text(text, target_language="en"):
    subscription_key =  os.getenv('AZURE_TRANSLATOR_KEY') # Replace with your actual API key
    endpoint = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0"
    
    # Specify the target language
    params = {"to": 'en'}
    
    # Request headers
    headers = {
        "Ocp-Apim-Subscription-Key": subscription_key,
        "Ocp-Apim-Subscription-Region": "centralindia",  # Replace with your region (e.g., "eastus")
        "Content-Type": "application/json"
    }
    
    # Request body
    body = [{"text": text}]
    
    try:
        response = requests.post(endpoint, params=params, headers=headers, json=body)
        response.raise_for_status()
        translation = response.json()[0]["translations"][0]["text"]
        return translation
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

