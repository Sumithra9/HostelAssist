import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ComplaintForm.css"; // Keep the original CSS

const ComplaintForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || ""; // Get category from URL

  // ✅ Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  // ✅ Initialize form with user data + selected category
  const [formData, setFormData] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    roomNo: storedUser.roomno || "",
    hostelBlock: storedUser.block || "",
    complaintCategory: selectedCategory,
    complaintDescription: "",
    availableDate: "",
    availableTime: "",
    file: null,
  });

  // ✅ Fetch latest user data from backend on mount (optional)
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
            roomNo: data.roomno || storedUser.roomNo,
            hostelBlock: data.block || storedUser.hostelBlock,
            complaintCategory: selectedCategory, // Keep category selected
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [selectedCategory]); // Re-run if category changes

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  // ✅ Handle form submission
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
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} readOnly />

      <label>Email:</label>
      <input type="text" name="email" value={formData.email} readOnly />

      <label>Room Number:</label>
      <input type="text" name="roomNo" value={formData.roomNo} readOnly />

      <label>Hostel Block:</label>
      <input type="text" name="hostelBlock" value={formData.hostelBlock} readOnly />

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

      <label>Description:</label>
      <textarea name="complaintDescription" value={formData.complaintDescription} onChange={handleInputChange} />

      <label>Available Date:</label>
      <input type="date" name="availableDate" value={formData.availableDate} onChange={handleInputChange} />

      <label>Available Time:</label>
      <input type="time" name="availableTime" value={formData.availableTime} onChange={handleInputChange} />

      <label>Upload File (Optional):</label>
      <input type="file" onChange={handleFileChange} />

      <button type="submit">Submit Complaint</button>
    </form>
  );
};

export default ComplaintForm;
