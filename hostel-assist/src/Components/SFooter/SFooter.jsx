import React from 'react';
import './SFooter.css'; // Import the CSS file for styling

const SFooter = () => {
  return (
    <div className="footer">
      <div className="links">
      <div className="footer-content-left">
          <h3>HostelAssist</h3>
          <p>Empowering hostel students with seamless complaint resolution and hassle-free assistance.</p>
      </div>

      <div className="footer-content-center">
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>FAQs</li>
            <li>Contact-Us</li>
          </ul>
      </div>

      <div className="footer-content-right">
          <h2>GET YOUR COMPLAINT RESOLVED</h2>
          <ul>
            <li>123-456-34533</li>
            <li>vitHostel@gmail.com</li>
          </ul>
        </div>
      </div>

        <div className="copyrighttext">
          &copy; {new Date().getFullYear()} HostelAssist. All rights reserved.
        </div>
    </div>
  );
};

export default SFooter;
