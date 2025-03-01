import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Complaint from "../models/Complaint.js";



const router = express.Router();

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."));
        }
    },
});

// POST route to submit a complaint
router.post("/", upload.single("file"), async (req, res) => {
    try {
        console.log("🔹 Complaint Data Received:", req.body);
        console.log("📂 Uploaded File:", req.file); // Log file info

        if (!req.file) {
            console.log("⚠️ No file uploaded!");
            return res.status(400).json({ message: "File upload failed." });
        }

        // Create complaint document
        const newComplaint = new Complaint({
            name: req.body.name,
            hostelBlock: req.body.hostelBlock,
            roomNo: req.body.roomNo,
            email: req.body.email,
            complaintCategory: req.body.complaintCategory,
            postedDate: new Date(),
            complaintDescription: req.body.complaintDescription,
            availableDate: req.body.availableDate,
            availableTime: req.body.availableTime,
            filePath: req.file.path, // ✅ Make sure this is saved!
        });

        await newComplaint.save();
        console.log("✅ Complaint Saved:", newComplaint);
        res.status(201).json({ message: "Complaint submitted successfully" });

    } catch (error) {
        console.error("❌ Error submitting complaint:", error);
        res.status(500).json({ error: error.message || "Server error" });
    }
});


// GET route to fetch all complaints
router.get("/", async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        console.error("❌ Error fetching complaints:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// ✅ Delete a complaint
router.delete("/:id", async (req, res) => {
    try {
      await Complaint.findByIdAndDelete(req.params.id);
      res.json({ message: "Complaint deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting complaint" });
    }
  });


  router.get("/api/complaints", async (req, res) => {
    try {
      const { block, category } = req.query;
  
      if (!block || !category) {
        return res.status(400).json({ message: "Block and category are required" });
      }
  
      console.log("Filtering complaints for Block:", block, "Category:", category); // Debugging Line
  
      // Ensure case-sensitive and exact match filtering
      const complaints = await Complaint.find({
        hostelBlock: block.trim(),  // Ensure it matches exactly
        complaintCategory: category.trim(),
      });
  
      console.log("Filtered Complaints:", complaints); // Debugging Line
      res.json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  



export default router; // ✅ Use 'export default' instead of 'module.exports'
