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

# Initialize lemmatizer
# lemmatizer = WordNetLemmatizer()

# def preprocess_text_advanced(text):
#     """Advanced preprocessing: handle emojis, URLs, mentions, stopwords, lemmatization, and punctuation."""
#     # Convert to lowercase
#     text = text.lower()

#     # Remove URLs
#     text = re.sub(r'http\S+|www\S+|https\S+', '', text)

#     # Remove user mentions (e.g., @username)
#     text = re.sub(r'@\w+', '', text)

#     # Remove emojis (using regex to match emojis)
#     text = re.sub(r'[^\w\s,]', '', text)  # Remove punctuation and non-word characters (preserve spaces and commas)

#     # Remove any extra spaces
#     text = re.sub(r'\s+', ' ', text).strip()

#     # Tokenize text
#     tokens = word_tokenize(text)

#     # Load stopwords
#     stop_words = set(stopwords.words("english"))

#     # Remove stopwords and keep only alphanumeric words
#     tokens = [word for word in tokens if word.isalnum() and word not in stop_words]

#     # Lemmatize tokens (reduce to root form)
#     tokens = [lemmatizer.lemmatize(word) for word in tokens]

#     # Join tokens back into a string
#     return " ".join(tokens)



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