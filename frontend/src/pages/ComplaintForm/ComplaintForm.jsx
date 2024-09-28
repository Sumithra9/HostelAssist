// src/pages/ComplaintForm.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function ComplaintForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  const [formData, setFormData] = useState({
    category: category || '',
    description: '',
    roomNumber: '',
    hostelBlock: '',
    availableTime: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/complaints', formData);
      navigate('/student/complaints/history');
    } catch (error) {
      console.error('Error submitting complaint', error);
    }
  };

  return (
    <div>
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input name="category" value={formData.category} readOnly required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Room Number:
          <input name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />
        </label>
        <label>
          Hostel Block:
          <input name="hostelBlock" value={formData.hostelBlock} onChange={handleChange} required />
        </label>
        <label>
          Available Time:
          <input name="availableTime" value={formData.availableTime} onChange={handleChange} required />
        </label>
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default ComplaintForm;
