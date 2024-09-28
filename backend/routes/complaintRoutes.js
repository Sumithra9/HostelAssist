const express = require('express');
const { getAllComplaints, getStudentComplaints, createComplaint, resolveComplaint } = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getStudentComplaints)       // For students to view their complaints
  .post(protect, createComplaint);          // For students to create complaints

router.route('/admin')
  .get(protect, admin, getAllComplaints);   // For admin to view all complaints

router.route('/:id/resolve')
  .put(protect, admin, resolveComplaint);   // For admin to mark complaints as resolved

module.exports = router;
