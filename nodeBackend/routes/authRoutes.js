// nodeBackend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const isAuthorized = require("../middleware/isAuthorized");

const {
  register,
  login,
  getAllResults,
  userDetails,
  outUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/getAllResults", isAuthorized, getAllResults);
router.get("/getuser", isAuthorized, userDetails);
router.post("/logout", isAuthorized, outUser);

module.exports = router;
