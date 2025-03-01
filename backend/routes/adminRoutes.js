import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

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

export default router;
