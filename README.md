

# RedesAI


RedesAI is a lightweight yet powerful sentiment analysis tool designed to evaluate and classify textual data into positive, negative, or neutral sentiments.  RedesAI provides quick and accurate insights to help you better understand your text data.

# Prerequisites for this Project
Enable Youtube Data Api v3 from google cloud console to get the api key

[[Youtube Api Website]](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

 Or watch tutorial

[[Youtube]](https://www.youtube.com/watch?v=LLAZUTbc97I)

### In backend Create .env file and Include these codes in it 
```bash
    FLASK_APP=app.py
    FLASK_ENV=development
    SECRET_KEY="Paste your Youtube Api Key Here"
```

# How to run project
   ## Backend
```bash
    cd backend
```
## For windows

Create a Virtual Environment (Windows):
```bash
     python -m venv venv
```

Activation on venv (Windows):
```bash
     venv\Scripts\activate
```

 If Activation Failed. Execute this command in powershell Administrator mode. : (Optional)
```bash
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## For Linux
Create a Virtual Environment(Linux):

```bash
    python3 -m venv myenv
```
Activation on venv (Linux):
```bash
   source myenv/bin/activate
```

## Common for both OS

### Installing packages & Dependencies:

Install packages from requirements.txt:

```bash
    pip install -r requirements.txt

```
    
## First train the model

```bash
    python initial.py
```
## Then Run the server

```bash
    python server.py
```
## Frontend

```bash
cd frontend
```
 Install packages
```bash
npm i
```
Run Frontend
```bash
npm run dev
```



# Website Overview


## Screenshots

## Home Page
![Home Page](https://github.com/Vis7044/RedesAI/blob/main/frontend/public/WebsiteScreenShot/Home_Page_ScreenShot.png?raw=true)

## Analysis Page
![Analysis Page](https://github.com/Vis7044/RedesAI/blob/main/frontend/public/WebsiteScreenShot/Analysis_page_ScreenShot.png?raw=true)

## Result Page
![Result Page](https://github.com/Vis7044/RedesAI/blob/main/frontend/public/WebsiteScreenShot/Result_page_ScreenShot.png?raw=true)
