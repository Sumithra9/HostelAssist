import React, { forwardRef } from "react";
import "./About.css";

const About = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="about-us">
      <h2>About Us</h2>
      <p>
        Welcome to <strong>HostelAssist</strong>, your all-in-one solution for a seamless hostel experience! 
      </p>
      <p>
        We understand the everyday challenges faced by hostel students—maintenance issues, complaint management, and lack of communication. 
        That's why we built <strong>HostelAssist</strong>—a user-friendly platform that allows students to:
      </p>
      <ul>
        <li><strong>File Complaints</strong> – Report issues related to electricity, AC, water, housekeeping, and more effortlessly.</li>
        <li><strong>Track Complaint History</strong> – Stay updated on the progress of your complaints in real time.</li>
        <li><strong>Quick Admin Resolution</strong> – Our system ensures complaints reach the right authorities and get resolved faster.</li>
        <li><strong>Seamless Communication</strong> – Get notified about updates and provide feedback after issue resolution.</li>
        <li><strong>Secure & Easy Access</strong> – Sign up, log in, and manage everything from your personalized profile.</li>
      </ul>
      <p>
        At <strong>HostelAssist</strong>, we believe in making hostel life hassle-free so that you can focus on what truly matters—your studies and personal growth.
      </p>
      <p><strong>Need help? We would love to hear from you! 📩</strong></p>
    </div>
  );
});

export default About;
