import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faUser } from '@fortawesome/free-solid-svg-icons'; // User icon
import './SNavBar.css';

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
        <li><Link to="/complaints">Post Complaint</Link></li>
        <li><Link to="/shistory">Complaint History</Link></li>
        <li onClick={() => scrollToRef(refs.faq)}>FAQs</li>
        <li onClick={() => scrollToRef(refs.about)}>About Us</li>
        <li onClick={() => scrollToRef(refs.contact)}>Contact Us</li>
        <li><Link to="/">Sign Out</Link></li>

        {/* Profile Icon Instead of "Profile" Text */}
        <li className="profile-icon">
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </Link>
        </li>
      </div>
    </div>
  );
};

export default SNavBar;
