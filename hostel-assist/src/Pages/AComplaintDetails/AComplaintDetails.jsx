import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AComplaintDetails.css";

const AComplaintDetails = () => {
  const { category, block } = useParams(); // Get category & block from URL
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    console.log("Fetching complaints for:", block, category); // Debugging Line

    fetch(`http://localhost:5000/api/complaints?block=${block}&category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Filtered complaints received:", data); // Debugging Line
        setComplaints(
          data.filter(complaint => 
            complaint.hostelBlock === block && complaint.complaintCategory === category
          )
        );
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [block, category]);

  return (
    <div className="acomplaint-details-container">
      <h1>Complaints for {category} - Block {block}</h1>

      <table className="complaint-table">
        <thead>
          <tr><th>Email ID</th><th>Student Name</th>
            <th>Room No</th>
            <th>Description</th>
            <th>Status</th>
            <th>Posted Date</th>
            <th>Available Date</th>
            <th>Available Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.email}</td>
                <td>{complaint.name}</td>
                <td>{complaint.roomNo}</td>
                <td>{complaint.complaintDescription}</td>
                <td>Pending</td> {/* You might want to add status logic later */}
                <td>{new Date(complaint.postedDate).toLocaleDateString()}</td>
                <td>{complaint.availableDate}</td>
                <td>{complaint.availableTime}</td>
                <td><button>Send OTP</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No complaints found for this category.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AComplaintDetails;
