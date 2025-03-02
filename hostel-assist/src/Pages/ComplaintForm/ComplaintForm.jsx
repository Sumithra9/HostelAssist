import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./ComplaintForm.css"; // ✅ Import CSS for styling

const ComplaintForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Hook for navigation
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "";

  // ✅ Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [formData, setFormData] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    roomno: storedUser.roomno || "",
    block: storedUser.block || "",
    complaintCategory: selectedCategory,
    complaintDescription: "",
    availableDate: "",
    availableTime: "",
    file: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setFormData((prevData) => ({
            ...prevData,
            name: data.name || storedUser.name,
            email: data.email || storedUser.email,
            roomno: data.roomno || storedUser.roomno,
            block: data.block || storedUser.block,
            complaintCategory: selectedCategory,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to submit a complaint.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Complaint submitted successfully!");
      } else {
        alert(data.message || "Failed to submit complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="complaint-form">
      <h1>Complaint Form</h1>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} readOnly />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} readOnly />
      </div>

      <div className="form-group">
        <label>Room Number:</label>
        <input type="text" name="roomno" value={formData.roomno} readOnly />
      </div>

      <div className="form-group">
        <label>Hostel Block:</label>
        <input type="text" name="block" value={formData.block} readOnly />
      </div>

      <div className="form-group">
        <label>Complaint Category:</label>
        <select name="complaintCategory" value={formData.complaintCategory} onChange={handleInputChange}>
          <option value="">Select Category</option>
          <option value="AC">AC</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Water Cooler">Water Cooler</option>
          <option value="Housekeeping">Housekeeping</option>
          <option value="Electrician">Electrician</option>
        </select>
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea name="complaintDescription" value={formData.complaintDescription} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Available Date:</label>
        <input type="date" name="availableDate" value={formData.availableDate} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Available Time:</label>
        <input type="time" name="availableTime" value={formData.availableTime} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Upload File (Optional):</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button type="submit">Submit Complaint</button>

      <button type="button" onClick={() => navigate("/student")} className="go-back-button">
        Go Back
      </button>
    </form>
  );
};

export default ComplaintForm;
