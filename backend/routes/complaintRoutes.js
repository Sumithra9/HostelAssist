import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// POST route to submit a complaint
router.post("/submit", async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit complaint" });
  }
});

// GET route to fetch all complaints
router.get("/history", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// DELETE route to remove a complaint
router.delete("/delete/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Complaint deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete complaint" });
  }
});

export default router;
