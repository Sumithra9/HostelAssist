import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import delete icon
import "./SHistory.css"; // Importing CSS

const Shistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Store user email to filter complaints

  // ✅ Fetch user details from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    if (storedUser.email) {
      setUserEmail(storedUser.email);
    }
  }, []);

  // ✅ Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints");
        const data = await response.json();

        // ✅ Filter complaints by logged-in user's email
        const userComplaints = data.filter((complaint) => complaint.email === userEmail);
        setComplaints(userComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    if (userEmail) {
      fetchComplaints();
    }
  }, [userEmail]); // Re-run when userEmail changes

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
    <div className="history-container">
      <h2>My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Available Date</th>
              <th>Available Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.complaintCategory}</td>
                <td>{complaint.complaintDescription}</td>
                <td>{complaint.availableDate || "Not Provided"}</td>
                <td>{complaint.availableTime}</td>
                <td>{complaint.status || "Pending"}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(complaint._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Shistory;
