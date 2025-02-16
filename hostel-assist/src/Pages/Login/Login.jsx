import React, { useState } from "react";
import { assets } from "../../assets/assets";
import SLoginPopup from "../../Components/SLoginPopup/SLoginPopup";
import ALoginPopup from "../../Components/ALoginPopup/ALoginPopup";
import "./Login.css";

const Login = () => {
  const [showSLogin, setShowSLogin] = useState(false);
  const [showALogin, setShowALogin] = useState(false);

  return (
    <div className="login-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Hostel Assist</h1>
          <p>Effortless Complaint Management for a Better Hostel Experience</p>
          <button className="cta-button" onClick={() => setShowSLogin(true)}>Get Started</button>
        </div>
      </section>

      {/* Login Options */}
      <div className="login-container">
        <h2 id="select">Select Your Login</h2>
        <br/>
        <div className="login-options">
          <div className="login-box">
            <h2>Student</h2>
            <div className="circle">
              <img src={assets.image} alt="Student" />
            </div>
            <button onClick={() => setShowSLogin(true)}>Login</button>
          </div>
          
          <div className="login-box">
            <h2>Admin</h2>
            <div className="circle">
              <img src={assets.image2} alt="Admin" />
            </div>
            <button onClick={() => setShowALogin(true)}>Login</button>
          </div>
        </div>
      </div>

      {showSLogin && <SLoginPopup setShowLogin={setShowSLogin} />}
      {showALogin && <ALoginPopup setShowLogin={setShowALogin} />}
    </div>
  );
};

export default Login;
