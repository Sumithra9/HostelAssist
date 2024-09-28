// src/pages/AdminComplaintList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminComplaintList() {
  const { category } = useParams();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`/api/complaints/admin`, {
          params: { category },
        });
        const filteredComplaints = response.data.filter((c) => c.status === 'pending');
        setComplaints(filteredComplaints);
      } catch (error) {
        console.error('Error fetching complaints', error);
      }
    };

    fetchComplaints();
  }, [category]);

  const handleResolve = async (id) => {
    try {
      await axios.put(`/api/complaints/${id}/resolve`);
      setComplaints(complaints.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Error resolving complaint', error);
    }
  };

  return (
    <div>
      <h2>{category} Complaints</h2>
      {complaints.length === 0 ? (
        <p>No pending complaints in this category</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id}>
            <p>Description: {complaint.description}</p>
            <p>Room Number: {complaint.roomNumber}</p>
            <p>Available Time: {complaint.availableTime}</p>
            <label>
              Resolved:
              <input type="checkbox" onChange={() => handleResolve(complaint._id)} />
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminComplaintList;
