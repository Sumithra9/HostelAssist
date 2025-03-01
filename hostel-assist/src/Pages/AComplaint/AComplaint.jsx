import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./AComplaint.css"; // Importing CSS
import { assets } from "../../assets/assets"; // Import images

const AComplaint = () => {
  const { block } = useParams(); // Get selected block from URL
  const navigate = useNavigate();

  return (
    <div className="acomplaint-container">
        
      <h1 id="maintxt">Manage Complaints - Block {block}</h1>
      <br />
      <p className="description">Select a category to view complaints</p>
      <br />
      <div className="complaint-options">
        <Link to={`/admin-complaints/${block}/AC`} className="option">
          <img src={assets.image3} alt="AC" />
          <br />
          <span>AC</span>
        </Link>
        <Link to={`/admin-complaints/${block}/Plumber`} className="option">
          <img src={assets.image4} alt="Plumber" />
          <br />
          <span>Plumber</span>
        </Link>
        <Link to={`/admin-complaints/${block}/Carpenter`} className="option">
          <img src={assets.image5} alt="Carpenter" />
          <br />
          <span>Carpenter</span>
        </Link>
        <Link to={`/admin-complaints/${block}/Water Cooler`} className="option">
          <img src={assets.image6} alt="Water Cooler" />
          <br />
          <span>Water Cooler</span>
        </Link>
        <Link to={`/admin-complaints/${block}/Housekeeping`} className="option">
          <img src={assets.image7} alt="Housekeeping" />
          <br />
          <span>Housekeeping</span>
        </Link>
        <Link to={`/admin-complaints/${block}/Electrician`} className="option">
          <img src={assets.image8} alt="Electrician" />
          <br />
          <span>Electrician</span>
        </Link>
      </div>

      {/* Go Back Button */}
      <button className="go-back-btn" onClick={() => navigate("/admin")}>
        Go Back
      </button>
    </div>
  );
};

export default AComplaint;
