import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import delete icon
import "./SHistory.css";

const SHistory = () => {
  const navigate = useNavigate();

  const [pendingComplaints, setPendingComplaints] = useState([
    { id: 1, type: "Plumbing", date: "2024-02-16" },
    { id: 2, type: "Electrical", date: "2024-02-14" },
  ]);

  const [historyComplaints, setHistoryComplaints] = useState([
    { id: 3, type: "Carpentry", registeredDate: "2024-02-10", resolvedDate: "2024-02-12" },
    { id: 4, type: "Mess", registeredDate: "2024-02-08", resolvedDate: "2024-02-11" },
  ]);

  const deleteComplaint = (id) => {
    setPendingComplaints(pendingComplaints.filter((complaint) => complaint.id !== id));
  };

  const submitFeedback = (id, rating) => {
    alert(`Feedback submitted for Complaint ID ${id}: ${rating} stars`);
  };

  return (
    <SHistoryComponent
      pendingComplaints={pendingComplaints}
      historyComplaints={historyComplaints}
      deleteComplaint={deleteComplaint}
      submitFeedback={submitFeedback}
      navigate={navigate}
    />
  );
};

const SHistoryComponent = ({ pendingComplaints, historyComplaints, deleteComplaint, submitFeedback, navigate }) => {
  const [activeTab, setActiveTab] = useState("status");

  return (
    <div className="shistory-container">
      {/* Toggle Buttons */}
      <div className="tab-buttons">
        <button className={activeTab === "status" ? "active" : ""} onClick={() => setActiveTab("status")}>
          Complaint Status
        </button>
        <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
          Complaint History
        </button>
      </div>

      {/* Complaint Status (Pending Complaints) */}
      {activeTab === "status" ? (
        <div className="complaint-table">
          {pendingComplaints.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Complaint Type</th>
                  <th>Complaint Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingComplaints.map((complaint, index) => (
                  <tr key={complaint.id}>
                    <td>{index + 1}</td>
                    <td>{complaint.type}</td>
                    <td>{complaint.date}</td>
                    <td>
                      <FaTrash className="delete-icon" onClick={() => deleteComplaint(complaint.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending complaints.</p>
          )}
        </div>
      ) : (
        /* Complaint History */
        <div className="complaint-table">
          {historyComplaints.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Complaint Type</th>
                  <th>Registered Date</th>
                  <th>Resolved Date</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {historyComplaints.map((complaint, index) => (
                  <tr key={complaint.id}>
                    <td>{index + 1}</td>
                    <td>{complaint.type}</td>
                    <td>{complaint.registeredDate}</td>
                    <td>{complaint.resolvedDate}</td>
                    <td>
                      <StarRating onSubmit={(rating) => submitFeedback(complaint.id, rating)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No complaint history available.</p>
          )}
        </div>
      )}

      {/* Back Button BELOW the table */}
      <button className="back-button" onClick={() => navigate("/student")}>
        ← Back to Home
      </button>
    </div>
  );
};

// ⭐⭐⭐⭐⭐ Star Rating Component ⭐⭐⭐⭐⭐
const StarRating = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (star) => {
    if (!submitted) {
      setRating(star);
    }
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
      setSubmitted(true);
    } else {
      alert("Please select a rating before submitting!");
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= (hover || rating) ? "filled-star" : "empty-star"}
          onMouseEnter={() => !submitted && setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
          style={{ cursor: submitted ? "default" : "pointer" }}
        >
          ★
        </span>
      ))}
      <button className="submit-feedback" onClick={handleSubmit} disabled={submitted}>
        {submitted ? "Submitted" : "Submit"}
      </button>
    </div>
  );
};

export default SHistory;
