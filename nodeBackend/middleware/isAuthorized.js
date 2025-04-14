// nodeBackend/middleware/isAuthorized.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthorized = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: Token verification failed",
      error: err.message,
    });
  }
};

module.exports = isAuthorized;
