import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import Complaint from "../models/Complaint.js";
import nodemailer from "nodemailer";
import { sendOTP, verifyOTP } from "../utils/otpHelper.js";

const router = express.Router();

// Admin Signup
router.post("/signup", async (req, res) => {
  try {
    const { aname, aemail, apassword } = req.body;

    const existingAdmin = await Admin.findOne({ aemail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(apassword, 10);
    const newAdmin = new Admin({ aname, aemail, apassword: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Admin Login (Without JWT)
router.post("/login", async (req, res) => {
  try {
    const { aemail, apassword } = req.body;

    const admin = await Admin.findOne({ aemail });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(apassword, admin.apassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Instead of JWT, return a success response with admin details
    res.status(200).json({ message: "Login successful", admin: { id: admin._id, name: admin.aname, email: admin.aemail } });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});




// Nodemailer Setup (use your email credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // 🔹 Use environment variables for security
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const result = await sendOTP(email);
  res.status(result.success ? 200 : 500).json(result);
});

// ✅ Verify OTP and update complaint status
router.post("/verify-otp", async (req, res) => {
  const { email, otp, complaintId } = req.body;
  if (!email || !otp || !complaintId) return res.status(400).json({ message: "All fields are required" });

  const result = verifyOTP(email, otp);
  if (!result.success) return res.status(400).json(result);

  try {
      await Complaint.findByIdAndUpdate(complaintId, { status: "Resolved" });
      res.status(200).json({ success: true, message: "Complaint marked as Resolved" });
  } catch (error) {
      res.status(500).json({ message: "Failed to update complaint status" });
  }
});



export default router;
