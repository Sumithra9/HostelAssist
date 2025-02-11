// /src/Components/SNavbar/SNavbar.jsx

import React from 'react';
import './SNavBar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SNavBar = () => {
  return (
    <div className="s-navbar">
      <div className="s-logo">
        <h2>HostelAssist</h2>
      </div>

      <div className="s-navbar-links">
        <li><Link to="/complaints">Complaints</Link></li> {/* Link to Complaints page */}
        <li><Link to="/profile">Profile</Link></li> {/* Link to Profile page */}
        <li><Link to="/shistory">Complaint-History</Link></li> {/* Link to Profile page */}
        
      </div>
    </div>
  );
};

export default SNavBar;
