import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js"; // Import User model

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging

    const { name, username, email, password, roomno, block} = req.body;

    // Check if all fields are provided
    if (!name || !username || !email || !password || !roomno || !block ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      roomno,
      block,
    });

    await newUser.save();
    
    console.log("User Saved:", newUser); // ✅ Debugging to check roomno & block

    res.status(201).json({ message: "User registered successfully!", user: newUser });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });



    // ✅ Only send necessary user details
    res.json({
      
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        roomno: user.roomno,
        block: user.block,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

// ✅ Get User Profile
router.get("/profile", async (req, res) => {
    try {
      // Check if the request contains a valid token
      const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>
      if (!token) {
        return res.status(401).json({ message: "Token is required" });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Use the secret from .env
      
      // Fetch the user from the database using the decoded user ID
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the user profile data
      res.json({
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          roomno: user.roomno,
          block: user.block,
        },
      });
    } catch (error) {
      console.error("Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
