// nodeBackend/middleware/isAuthorized.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthorized = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // ✅ corrected line
      if (decodedToken) {
        req.userId = decodedToken.id;
        console.log("Decoded token:", decodedToken);
        return next();
      }
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: Token verification failed",
      error: err.message,
    });
  }
};

module.exports = isAuthorized;
