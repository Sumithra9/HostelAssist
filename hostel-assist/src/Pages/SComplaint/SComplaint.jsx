import React from "react";
import { Link } from "react-router-dom";
import "./SComplaint.css"; // Importing CSS specific to this component

const SComplaint = () => {
  return (
    <div className="scomplaint-container">
      <h1>Post a Complaint</h1>
      <div className="complaint-options">
        <Link to="/complaint-form?category=AC" className="option">AC</Link>
        <Link to="/complaint-form?category=Plumber" className="option">Plumber</Link>
        <Link to="/complaint-form?category=Carpenter" className="option">Carpenter</Link>
        <Link to="/complaint-form?category=Water Cooler" className="option">Water Cooler</Link>
        <Link to="/complaint-form?category=Housekeeping" className="option">Housekeeping</Link>
      </div>
    </div>
  );
};

export default SComplaint;
