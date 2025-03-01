import React from 'react';
import './SFooter.css'; // Import the CSS file for styling

const SFooter = ({ scrollToRef, refs }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer">
      <div className="links">
        <div className="footer-content-left">
          <h3>HostelAssist</h3>
          <p>Empowering hostel students with seamless complaint resolution and hassle-free assistance.</p>
        </div>

        <div className="footer-content-center">
          <ul>
            <li onClick={() => scrollToRef(refs.faq)}>FAQs</li>
            <li onClick={() => scrollToRef(refs.about)}>About Us</li>
            <li onClick={() => scrollToRef(refs.contact)}>Contact Us</li>
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
