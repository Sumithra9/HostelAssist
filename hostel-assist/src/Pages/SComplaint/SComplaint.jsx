import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SComplaint.css"; // Importing CSS

// Import a sample image for all options
import { assets } from "../../assets/assets";

const SComplaint = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="scomplaint-container">
      <h1 id="maintxt">Post a Complaint</h1>
      <br />
      <p className="description">Select a category below to report an issue</p>
      <br />
      <div className="complaint-options">
        <Link to="/complaint-form?category=AC" className="option">
          <img src={assets.image3} alt="AC" />
          <br />
          <span>AC</span>
        </Link>
        <Link to="/complaint-form?category=Plumber" className="option">
          <img src={assets.image4} alt="Plumber" />
          <br />
          <span>Plumber</span>
        </Link>
        <Link to="/complaint-form?category=Carpenter" className="option">
          <img src={assets.image5} alt="Carpenter" />
          <br />
          <span>Carpenter</span>
        </Link>
        <Link to="/complaint-form?category=Water Cooler" className="option">
          <img src={assets.image6} alt="Water Cooler" />
          <br />
          <span>Water Cooler</span>
        </Link>
        <Link to="/complaint-form?category=Housekeeping" className="option">
          <img src={assets.image7} alt="Housekeeping" />
          <br />
          <span>Housekeeping</span>
        </Link>
        <Link to="/complaint-form?category=Electrician" className="option">
          <img src={assets.image8} alt="Electrician" />
          <br />
          <span>Electrician</span>
        </Link>
      </div>

      {/* Go Back Button */}
      <button className="go-back-btn" onClick={() => navigate("/student")}>
        Go Back
      </button>
    </div>
  );
};

export default SComplaint;
