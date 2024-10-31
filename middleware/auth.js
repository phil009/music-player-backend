const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  if (!token) {
    console.error("No token found in the request headers.");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Session expired. Please log in again." });
      }
      console.error("Token verification error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("Decoded user:", user);
    req.user = user;
    next();
  });
};

// Middleware to check isAdmin
const isAdmin = (req, res, next) => {
  console.log("User in isAdmin middleware:", req.user);
  if (!req.user?.isAdmin) {
    console.error("Access denied: User does not have admin privileges.");
    return res.status(403).json({ message: "Admin privileges are required" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
