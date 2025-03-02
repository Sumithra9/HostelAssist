import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import User from "./models/User.js"; // Import User Model

dotenv.config(); // ✅ Load environment variables first

const app = express(); // ✅ Initialize Express before using it

// Middleware
app.use(express.json()); // ✅ Parse JSON
app.use(cors()); // ✅ Enable CORS

// Static file serving (for file uploads)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes); // ✅ Added Admin Routes

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ User Registration Route (If not already in authRoutes.js)
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, username, email, password, roomno, block, isAdmin } = req.body;

    // Validate input
    if (!name || !username || !email || !password || !roomno || !block) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (Admin flag included)
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      roomno,
      block,
      isAdmin: isAdmin || false, // Default: Not an admin
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin user
    const admin = await User.findOne({ email, isAdmin: true });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ message: "Admin login successful", token });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Protected Admin Route (Without Middleware)
app.get("/api/admin/dashboard", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Access Denied: No token provided" });
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    if (!verified.isAdmin) {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    res.json({ message: "Welcome to the Admin Dashboard" });
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
});

// ✅ Default API Route
app.get("/", (req, res) => {
  res.send("🚀 HostelAssist API is running...");
});


app.use("/api/admin", adminRoutes);
// ✅ Register the complaints route
app.use("/api", complaintRoutes); 

