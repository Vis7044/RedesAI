from preprocess import prepare_data
from train import train_model
from predict import load_model, predict_sentiment
import pandas as pd




if __name__ == "__main__":
    # Step 1: Prepare the data
    file_path = "filtered_comments_sentiment_updated.csv"  # Replace with your CSV file
    X, y, vectorizer = prepare_data(file_path)

     # Step 2: Train the model and save the vectorizer
    train_model(X, y, vectorizer)  # Pass the vectorizer here

    # Step 3: Predict sentiment for new comments
    model, vectorizer = load_model()
    new_comments = pd.read_csv("reviews.csv")["ReviewText"].values
    predictions = predict_sentiment(new_comments, model, vectorizer)

    # Print predictions
    counter = 0
    for comment, sentiment in zip(new_comments, predictions):
        # if counter == 10:
        #     break
        print(f"Comment: '{comment}' - Sentiment: {sentiment}")
        counter += 1
