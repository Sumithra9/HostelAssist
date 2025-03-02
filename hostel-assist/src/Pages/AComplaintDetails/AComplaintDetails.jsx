import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AComplaintDetails.css";

const AComplaintDetails = () => {
  const { category, block } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/complaints?block=${block}&category=${category}`)
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [block, category]);

  const handleSendOtp = async (email, complaintId) => {
    try {
        const response = await fetch("http://localhost:5000/api/admin/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("OTP sent successfully!");
            setSelectedComplaint(complaintId);
        } else {
            alert(data.message || "Failed to send OTP.");
        }
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
};

const handleVerifyOtp = async () => {
  if (!otp || !selectedComplaint) return alert("Please enter OTP");

  try {
      const response = await fetch("http://localhost:5000/api/admin/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
              email: complaints.find(c => c._id === selectedComplaint).email, 
              otp, 
              complaintId: selectedComplaint 
          }),
      });

      const data = await response.json();
      if (response.ok) {
          alert("OTP verified! Complaint marked as Resolved.");
          setComplaints(complaints.map(c => c._id === selectedComplaint ? { ...c, status: "Resolved" } : c));
          setSelectedComplaint(null);
          setOtp("");
      } else {
          alert(data.message || "Invalid OTP.");
      }
  } catch (error) {
      console.error("Error verifying OTP:", error);
  }
};


  return (
    <div className="acomplaint-details-container">
      <h1>Complaints for {category} - Block {block}</h1>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>Email</th><th>Student Name</th>
            <th>Room No</th><th>Description</th>
            <th>Status</th><th>Posted Date</th>
            <th>Available Date</th><th>Available Time</th>
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
                <td>{complaint.status || "Pending"}</td>
                <td>{new Date(complaint.postedDate).toLocaleDateString()}</td>
                <td>{complaint.availableDate}</td>
                <td>{complaint.availableTime}</td>
                <td>
                  {complaint.status === "Resolved" ? "✅ Resolved" : (
                    <>
                      <button onClick={() => handleSendOtp(complaint.email, complaint._id)}>Send OTP</button>
                      {selectedComplaint === complaint._id && (
                        <div>
                          <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <button onClick={handleVerifyOtp}>Verify OTP</button>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="9">No complaints found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AComplaintDetails;
