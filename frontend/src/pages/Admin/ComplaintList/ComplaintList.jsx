import React, { useEffect, useState } from 'react';
import complaintService from '../../../api/complaintService';
import { useAuth } from '../../../context/AuthContext';
import './ComplaintList.css';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      const data = await complaintService.getAllComplaints(user.token);
      setComplaints(data);
    };

    fetchComplaints();
  }, [user]);

  return (
    <div className="complaint-list">
      <h2>All Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id}>{complaint.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;
