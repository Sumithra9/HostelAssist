import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AHeader from "../../Components/AHeader/AHeader"; 
import AFooter from "../../Components/AFooter/AFooter";
import "./AHome.css"; 
import { assets } from "../../assets/assets";

const AHome = () => {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState("");

  const handleSignOut = () => {
    alert("Signing out...");
  };

  // Function to navigate to AComplaint.jsx with block parameter
  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
    navigate(`/admin-complaints/${block}`); // Redirect to AComplaint.jsx
  };

  // 3D Effect on Mouse Move (No Changes)
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.1)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div className="aHome-container">
      <AHeader onSignOut={handleSignOut} />

      <main className="aHome-content">
        <div className="aHome-header">
          <h1 id="welcome">Welcome to HostelAssist Admin Panel</h1>
          <p className="header-subtext">Please select a hostel block to manage complaints</p>
        </div>

        <div className="block-selection">
          {/* Block B */}
          <div 
            className="block-card" 
            onClick={() => handleBlockSelect("B")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={assets.image9} alt="Block B" />
            <div className="block-overlay">
              <h3>Block B</h3>
            </div>
          </div>

          {/* Block C */}
          <div 
            className="block-card" 
            onClick={() => handleBlockSelect("C")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={assets.image10} alt="Block C" />
            <div className="block-overlay">
              <h3>Block C</h3>
            </div>
          </div>
        </div>

        {selectedBlock && <p className="selected-text">You selected: <strong>Block {selectedBlock}</strong></p>}
      </main>

      <AFooter />
    </div>
  );
};

export default AHome;
