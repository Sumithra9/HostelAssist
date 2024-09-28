import React, { useState } from 'react';
import complaintService from '../../../api/complaintService';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ComplaintForm.css';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await complaintService.submitComplaint({ complaint, userId: user.id }, user.token);
    navigate('/student/history');
  };

  return (
    <div className="complaint-form">
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ComplaintForm;
