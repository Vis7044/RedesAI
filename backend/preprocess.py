import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import CountVectorizer

# Download necessary NLTK data
nltk.download("punkt")
nltk.download("stopwords")
nltk.download("wordnet")
nltk.download('punkt_tab')



def preprocess_text(text):
    """Preprocesses text by tokenizing, converting to lowercase, and removing stopwords and punctuation."""
    tokens = word_tokenize(text.lower())  # Convert to lowercase and tokenize
    
    tokens = [word for word in tokens if word.isalnum()]  # Remove punctuation
    tokens = [word for word in tokens if word not in stopwords.words("english")]  # Remove stopwords
    return " ".join(tokens)

def prepare_data(file_path):
    """Loads data from a CSV file, preprocesses it, and converts text to numerical features."""
    try:
        # Load dataset
        df = pd.read_csv(file_path)
        
        if "comment" not in df.columns or "sentiment" not in df.columns:
            raise ValueError("CSV file must contain 'comment' and 'sentiment' columns.")
        
        # Preprocess comments
        df["cleaned_comment"] = df["comment"].apply(preprocess_text)
        
        # Convert text to numerical features using CountVectorizer
        vectorizer = CountVectorizer()
        X = vectorizer.fit_transform(df["cleaned_comment"])  # Features
        y = df["sentiment"]  # Labels
        return X, y, vectorizer
    except Exception as e:
        print(f"Error loading or processing the file: {e}")
        return None, None, None