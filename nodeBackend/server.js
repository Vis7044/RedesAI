// nodeBackend/server.js

const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./dbConnect/dbConnect");
const authRoutes = require("./routes/authRoutes");
const videoRoutes=require("./routes/videoRoutes")
const cors = require("cors");
const app = express();
dotenv.config();

app.use(express.json());
connectDB();
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/video",videoRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
