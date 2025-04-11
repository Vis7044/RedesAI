import requests
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

def detect_language(text):
    subscription_key = os.getenv('AZURE_TRANSLATOR_KEY')  # Replace with your API key
    endpoint = "https://api.cognitive.microsofttranslator.com/detect?api-version=3.0"
    
    headers = {
        "Ocp-Apim-Subscription-Key": subscription_key,
        "Ocp-Apim-Subscription-Region": "centralindia",  # e.g., "eastus"
        "Content-Type": "application/json"
    }
    
    body = [{"text": text}]
    
    try:
        response = requests.post(endpoint, headers=headers, json=body)
        response.raise_for_status()
        detected_language = response.json()[0]["language"]
        confidence = response.json()[0]["score"]
        print(f"Detected Language: {detected_language} (Confidence: {confidence:.2f})")
        return detected_language
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage
text = "tum kaise ho"
detect_language(text)
