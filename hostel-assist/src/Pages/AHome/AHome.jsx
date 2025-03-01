import React, { useState } from "react";
import AHeader from "../../Components/AHeader/AHeader"; 
import AFooter from "../../Components/AFooter/AFooter";
import "./AHome.css"; 
import { assets } from "../../assets/assets";

const AHome = () => {
  const [selectedBlock, setSelectedBlock] = useState("");

  const handleSignOut = () => {
    alert("Signing out...");
  };

  

  // 3D Effect on Mouse Move
  const handleMouseMove = (e, block) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.1)`;
  };

  // Reset Effect on Mouse Leave
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div className="aHome-container">
      <AHeader onSignOut={handleSignOut} />

      <main className="aHome-content">
       
      <div className="aHome-header">
  <h1 id="welcome">Welcome to HostelAssist Admin Panel</h1>
  <br/>
  <p className="header-subtext">Please select a hostel block to manage complaints</p>
</div>


        <div className="block-selection">
          {/* Block B */}
          <div 
            className="block-card" 
            onClick={() => handleBlockSelect("B")}
            onMouseMove={(e) => handleMouseMove(e, "B")}
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
            onMouseMove={(e) => handleMouseMove(e, "C")}
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
