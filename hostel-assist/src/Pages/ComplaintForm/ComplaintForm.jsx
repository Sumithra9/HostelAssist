import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ComplaintForm.css';

const ComplaintForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to manage user data
  const [userData, setUserData] = useState({
    name: '',
    hostelBlock: '',
    roomNo: '',
    email: '',
  });

  // State to manage form data
  const [formData, setFormData] = useState({
    complaintCategory: '',
    postedDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    complaintDescription: '',
    availableDate: '',
    availableTime: '',
    file: null,
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.user.name,
            hostelBlock: data.user.block,
            roomNo: data.user.roomno,
            email: data.user.email,
          });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Extract 'category' from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFormData((prevData) => ({
        ...prevData,
        complaintCategory: category,
      }));
    }
  }, [location.search]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        file: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.complaintDescription ||
      !formData.availableDate ||
      !formData.availableTime
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create a new complaint object
    const newComplaint = {
      id: Date.now(), // Unique identifier
      name: userData.name,
      hostelBlock: userData.hostelBlock,
      roomNo: userData.roomNo,
      email: userData.email,
      complaintCategory: formData.complaintCategory,
      postedDate: formData.postedDate,
      complaintDescription: formData.complaintDescription,
      availableDate: formData.availableDate,
      availableTime: formData.availableTime,
    };

    // Retrieve existing complaints from localStorage
    const storedComplaints = JSON.parse(localStorage.getItem("pendingComplaints")) || [];
    
    // Add the new complaint to the list
    storedComplaints.push(newComplaint);

    // Save the updated complaints list in localStorage
    localStorage.setItem("pendingComplaints", JSON.stringify(storedComplaints));

    try {
      // Replace with your API call if needed
      alert('Complaint registered successfully!');
      navigate('/student'); // Redirect to student dashboard or desired page
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to register complaint. Please try again.');
    }
  };

  return (
    <div className="complaint-form-container">
      <h1>Complaint Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={userData.name} disabled />
        </label>
        <label>
          Hostel Block:
          <input type="text" value={userData.hostelBlock} disabled />
        </label>
        <label>
          Room No:
          <input type="text" value={userData.roomNo} disabled />
        </label>
        <label>
          Complaint Category:
          <input
            type="text"
            name="complaintCategory"
            value={formData.complaintCategory}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input type="email" value={userData.email} disabled />
        </label>
        <label>
          Posted Date:
          <input type="date" value={formData.postedDate} disabled />
        </label>
        <label>
          Complaint Description:
          <textarea
            name="complaintDescription"
            value={formData.complaintDescription}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Available Date:
          <input
            type="date"
            name="availableDate"
            value={formData.availableDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Available Time:
          <input
            type="time"
            name="availableTime"
            value={formData.availableTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Add File (max 1MB):
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button className="go-back-btn" onClick={() => navigate('/student')}>
        Go Back
      </button>
    </div>
  );
};

export default ComplaintForm;




