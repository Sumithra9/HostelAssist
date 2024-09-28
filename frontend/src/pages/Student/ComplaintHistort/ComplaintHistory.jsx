import React, { useEffect, useState } from 'react';
import complaintService from '../../../api/complaintService';
import { useAuth } from '../../../context/AuthContext';
import './ComplaintHistory.css';

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      const data = await complaintService.getComplaintHistory(user.id, user.token);
      setComplaints(data);
    };

    fetchComplaints();
  }, [user]);

  return (
    <div className="complaint-history">
      <h2>Complaint History</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id}>{complaint.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintHistory;
