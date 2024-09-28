import axios from 'axios';

const API_URL = 'http://localhost:5000/api/complaints/'; // Adjust as necessary

// Get all complaints
const getAllComplaints = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Submit a new complaint
const submitComplaint = async (complaintData, token) => {
  const response = await axios.post(API_URL, complaintData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get complaint history for a user
const getComplaintHistory = async (userId, token) => {
  const response = await axios.get(API_URL + 'history/' + userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default { getAllComplaints, submitComplaint, getComplaintHistory };
