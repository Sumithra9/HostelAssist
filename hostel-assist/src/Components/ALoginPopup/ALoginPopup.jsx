import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import "./ALoginPopup.css";

const ALoginPopup = ({ setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    aname: "",
    ausername: "",
    aemail: "",
    apassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        aemail: formData.aemail, // ✅ Match backend
        apassword: formData.apassword,
      });
  
      localStorage.setItem("adminToken", response.data.token);
      console.log("Admin Login Successful", response.data);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };
  

  // Handle Admin Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/signup", {
        aname: formData.aname,
        aemail: formData.aemail,
        apassword: formData.apassword,
      });
  
      console.log("Admin Signup Successful", response.data);
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };
  

  return (
    <div className="loginpopup-overlay">
      <div className="loginpopup">
        <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
        {error && <p className="error-message">{error}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Admin Login</h2>
            <input
              type="email"
              name="aemail"
              required
              placeholder="Enter your Email"
              value={formData.aemail}
              onChange={handleChange}
            />
            <input
              type="password"
              name="apassword"
              required
              placeholder="Enter your Password"
              value={formData.apassword}
              onChange={handleChange}
            />
            <button type="submit" className="form-button">Login</button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)} className="link1">Sign up here</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="signup-form">
            <h2>Admin Signup</h2>
            <input
              type="text"
              name="aname"
              required
              placeholder="Enter your name"
              value={formData.aname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ausername"
              required
              placeholder="Enter your username"
              value={formData.ausername}
              onChange={handleChange}
            />
            <input
              type="email"
              name="aemail"
              required
              placeholder="Enter your email"
              value={formData.aemail}
              onChange={handleChange}
            />
            <input
              type="password"
              name="apassword"
              required
              placeholder="Create a password"
              value={formData.apassword}
              onChange={handleChange}
            />
            <button type="submit" className="form-button">Create Account</button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} className="link1">Login here</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ALoginPopup;
