import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Needed for login & authentication
import dotenv from "dotenv";
import User from "../models/User.js"; 
// Import User model
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
dotenv.config();

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
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found!" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });



//     // ✅ Only send necessary user details
//     res.json({
      
//       user: {
//         id: user._id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         roomno: user.roomno,
//         block: user.block,
//       },
//     });

//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error!" });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id }, // Payload (User ID)
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "1h" } // Token expiry time
    );

    // ✅ Send token along with user details
    res.json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        roomno: user.roomno,
        block: user.block,
      },
      token, // Include JWT token in response
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

// ✅ Get User Profile
// router.get("/profile", async (req, res) => {
//     try {
//       // Check if the request contains a valid token
//       const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>
//       if (!token) {
//         return res.status(401).json({ message: "Token is required" });
//       }
  
//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Use the secret from .env
      
//       // Fetch the user from the database using the decoded user ID
//       const user = await User.findById(decoded.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       // Return the user profile data
//       res.json({
//         user: {
//           id: user._id,
//           name: user.name,
//           username: user.username,
//           email: user.email,
//           roomno: user.roomno,
//           block: user.block,
//         },
//       });
//     } catch (error) {
//       console.error("Profile Error:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
// });

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Get authenticated user's ID
    const userId = req.user.id;

    // Fetch user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile data
    res.json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        roomno: user.roomno,
        block: user.block
      },
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Secure Profile Update Route
router.put("/update", authMiddleware, async (req, res) => { 
  try {
    const { name, username, roomno, block } = req.body;

    console.log("Received Update Data:", req.body); // ✅ Debugging

    const userId = req.user.id; // ✅ Secure: Gets user ID from the token

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, username, roomno, block } }, // ✅ Ensures update for all fields
      { new: true } // ✅ Returns updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
