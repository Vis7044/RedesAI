
# RedesAI


RedesAI is a lightweight yet powerful sentiment analysis tool designed to evaluate and classify textual data into positive, negative, or neutral sentiments.  RedesAI provides quick and accurate insights to help you better understand your text data.

## Deployment In Backend



Create a Virtual Environment(Linux):

```bash
    python3 -m venv myenv
```
Activation on venv (Linux):
```bash
   source myenv/bin/activate
```

Create a Virtual Environment (Windows):
```bash
     python -m venv venv
```

Activation on venv (Windows):
```bash
     venv\Scripts\activate
```
(--If Scripts on system is "Restricted"--)
Set the ExecutionPolicy to allow Scripts:
```bash
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
## Packages extraction Command

List Installed Packages:
```bash
     pip freeze > requirements.txt

```
## Installing packages & Dependencies:

Install packages from requirements.txt:

```bash
    pip install -r requirements.txt

```
    
## Run Backend

```bash
    python server.py
```
## Run Frontend

Run Frontend
```bash
npm run dev
```
