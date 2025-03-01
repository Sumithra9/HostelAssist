import React, { useEffect, useState } from "react";
import "./AHome.css"; // CSS for styling

const AHome = () => {
  const [complaints, setComplaints] = useState([]);

  // ✅ Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints/all");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin Complaint Dashboard</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Available Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.complaintCategory}</td>
                <td>{complaint.complaintDescription}</td>
                <td>{complaint.availableDate || "N/A"}</td>
                <td>{complaint.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AHome;
