const express = require("express");
const router = express.Router();

const {
  getComments,
  getVideoDetails,
} = require("../controllers/authController");
