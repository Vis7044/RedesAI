// nodeBackend/models/userModel.js
const mongoose = require("mongoose");

const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  result: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
    },
  ],
});

module.exports = mongoose.model("User", User);
