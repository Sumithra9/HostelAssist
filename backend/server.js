import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
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
app.use("/api/complaints", complaintRoutes); // ✅ Moved below app initialization

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
    const { name, username, email, password, roomno, block } = req.body;

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

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Default API Route
app.get("/", (req, res) => {
  res.send("🚀 HostelAssist API is running...");
});
