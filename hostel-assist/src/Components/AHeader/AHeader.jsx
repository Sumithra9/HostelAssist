import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./AHeader.css";

const AHeader = ({ onSignOut }) => {
  return (
    <header className="aheader">
      <h1 id="logo">HostelAssist</h1>

      <div className="aheader-right">
        {/* Profile Icon with Link to Admin Profile Page */}
        <Link className="profile-icon">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Link>

        <button onClick={onSignOut}>Sign Out</button>
      </div>
    </header>
  );
};

export default AHeader;
