# train.py
def train_model(X, y, vectorizer, model_path="sentiment_model.pkl", vectorizer_path="vectorizer.pkl"):
    """Trains a Logistic Regression model and saves it along with the vectorizer."""
    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import accuracy_score, classification_report
    import joblib

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train Logistic Regression model
    model = LogisticRegression(multi_class="ovr", max_iter=1000)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("\nClassification Report:\n", classification_report(y_test, y_pred))

    # Save the model
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

    # Save the vectorizer
    joblib.dump(vectorizer, vectorizer_path)
    print(f"Vectorizer saved to {vectorizer_path}")
