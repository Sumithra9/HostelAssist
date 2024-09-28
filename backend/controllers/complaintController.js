const Complaint = require('../models/Complaint');

// @desc    Get all complaints (for admin)
const getAllComplaints = async (req, res) => {
  try {
    const { category, hostelBlock } = req.query; // Destructure the query parameters

    let query = {};
    if (category) {
      query.category = category; // Filter by category if provided
    }
    if (hostelBlock) {
      query.hostelBlock = hostelBlock; // Filter by hostel block if provided
    }

    const complaints = await Complaint.find(query);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get complaints for a specific student
const getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ studentId: req.user.id });
    res.json({
      pendingComplaints: complaints.filter(c => c.status === 'pending'),
      complaintHistory: complaints.filter(c => c.status === 'resolved')
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a complaint
const createComplaint = async (req, res) => {
  try {
    const { category, description, roomNumber, hostelBlock, availableTime } = req.body;
    const complaint = new Complaint({
      category,
      description,
      roomNumber,
      hostelBlock,
      availableTime,
      studentId: req.user.id
    });
    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(400).json({ message: 'Error creating complaint' });
  }
};

// @desc    Update a complaint (mark as resolved)
const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = 'resolved';
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllComplaints,
  getStudentComplaints,
  createComplaint,
  resolveComplaint
};