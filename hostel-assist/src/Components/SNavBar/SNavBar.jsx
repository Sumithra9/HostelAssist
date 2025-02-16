// /src/Components/SNavbar/SNavbar.jsx

import React from 'react';
import './SNavBar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SNavBar = ({ scrollToRef, refs }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  return (
    <div className="s-navbar">
      <div className="s-logo">
        <h2>HostelAssist</h2>
      </div>

      <div className="s-navbar-links">
        <li><Link to="/complaints">Post Complaint</Link></li> {/* Link to Complaints page */}
        <li><Link to="/shistory">Complaint History</Link></li> {/* Link to Profile page */}
        <li onClick={() => scrollToRef(refs.faq)}>FAQs</li>
        <li onClick={() => scrollToRef(refs.about)}>About Us</li>
        <li onClick={() => scrollToRef(refs.contact)}>Contact Us</li>
        <li><Link to="/profile">Profile</Link></li> {/* Link to Profile page */}
        <li><Link to="/" >Sign Out</Link></li>
      </div>
    </div>
  );
};

export default SNavBar;
