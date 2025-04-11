// nodeBackend/server.js

const express=require('express')
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')
const connectDB =require('./dbConnect/dbConnect')


const app=express();
dotenv.config()

app.use(express.json());
connectDB();
app.use(cookieParser);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});



