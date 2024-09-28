// src/pages/ComplaintHistory.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function ComplaintHistory() {
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('/api/complaints');
        setPendingComplaints(response.data.pendingComplaints);
        setResolvedComplaints(response.data.complaintHistory);
      } catch (error) {
        console.error('Error fetching complaints', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Complaint History</h2>
      <h3>Pending Complaints</h3>
      {pendingComplaints.length === 0 ? (
        <p>No pending complaints</p>
      ) : (
        pendingComplaints.map((complaint) => (
          <div key={complaint._id}>
            <p>{complaint.description}</p>
            <p>Status: {complaint.status}</p>
          </div>
        ))
      )}
      <h3>Resolved Complaints</h3>
      {resolvedComplaints.length === 0 ? (
        <p>No resolved complaints</p>
      ) : (
        resolvedComplaints.map((complaint) => (
          <div key={complaint._id}>
            <p>{complaint.description}</p>
            <p>Status: {complaint.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ComplaintHistory;
