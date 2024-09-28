const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Electrical', 'Plumbing', 'Carpentry', 'AC', 'Housekeeping', 'Mess', 'Water Coolers', 'Miscellaneous']
  },
  description: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  hostelBlock: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D1', 'D2']
  },
  availableTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
