import React from "react";
import "./AHeader.css";

const AHeader = ({ onSignOut }) => {
  return (
    <header className="aheader">
      <h1>HostelAssist</h1>

      <div className="aheader-right">
        <a href="/complaints">Complaints</a>
        <div className="profile-icon">U</div>
        <button onClick={onSignOut}>Sign Out</button>
      </div>
    </header>
  );
};

export default AHeader;
