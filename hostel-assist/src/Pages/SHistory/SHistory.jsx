import React, { useEffect, useState } from "react";

const Shistory = () => {
  const [complaints, setComplaints] = useState([]);

  // ✅ Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // ✅ Handle delete complaint
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "DELETE",
      });

      // Remove complaint from UI
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <div>
      <h2>My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint._id}>
              <strong>Category:</strong> {complaint.complaintCategory} <br />
              <strong>Description:</strong> {complaint.complaintDescription} <br />
              <strong>Status:</strong> {complaint.status || "Pending"} <br />
              <button onClick={() => handleDelete(complaint._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Shistory;
