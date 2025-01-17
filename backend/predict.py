import joblib
from preprocess import preprocess_text

def load_model(model_path="sentiment_model.pkl", vectorizer_path="vectorizer.pkl"):
    """Loads the saved model and vectorizer."""
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    return model, vectorizer

def predict_sentiment(comments, model, vectorizer):
    """Predicts sentiment for a list of comments."""
    processed_comments = [preprocess_text(comment) for comment in comments]
    features = vectorizer.transform(processed_comments)
    predictions = model.predict(features)
    return predictions