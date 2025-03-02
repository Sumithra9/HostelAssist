import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user ID to the request object
    req.user = decoded;

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
