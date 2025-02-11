// /src/Components/SHeader/SHeader.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './SHeader.css';
import { assets } from '../../assets/assets'; // Importing assets from assets.js

const SHeader = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePostComplaintClick = () => {
    navigate('/complaints'); // Navigate to the Complaints page
  };

  const handleViewComplaintClick = () => {
    navigate('/shistory'); // Navigate to the View History page
  };

  return (
    <header className="header-container" style={{ backgroundImage: `url(${assets.HeaderImg})` }}>
      <div className="header-content">
        <h1>Welcome to HostelAssist</h1>
        <p>
        Simplifying Hostel Living with Easy Complaint Management! </p>
        <button className="Post Complaints" onClick={handlePostComplaintClick}>Post Complaints</button>
        <button className="View Complaints" onClick={handleViewComplaintClick}>View Complaints</button>

      </div>
    </header>
  );
};

export default SHeader;
