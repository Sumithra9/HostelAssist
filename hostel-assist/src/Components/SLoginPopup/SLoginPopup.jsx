import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../api/auth"; // Import API functions
import "./SLoginPopup.css";

const SLoginPopup = ({ setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roomno: "",
    block: "",
  });

  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Student Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ 
        email: formData.email, 
        password: formData.password 
      });
      
      console.log("Login Successful:", response);
      localStorage.setItem("token", response.token); // Store token

      navigate("/student"); // Redirect to student page
    } catch (error) {
      setError("Wrong credentials! Please try again.");
    }
  };

  // Handle Student Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Signup Successful! Please log in.");
      setIsLogin(true); // Switch to login form
    } catch (error) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="loginpopup-overlay">
      <div className="loginpopup">
        <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>

        {/* Show Error Message */}
        {error && <p className="error-message">{error}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Student Login</h2>
            <input name="email" type="email" required placeholder="Enter your Email" onChange={handleChange} />
            <input name="password" type="password" required placeholder="Enter your Password" onChange={handleChange} />
            <button type="submit" className="form-button">Login</button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)} className="link1">
                Sign up here
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="signup-form">
            <h2>Student Signup</h2>
            <input name="name" type="text" required placeholder="Enter your Name" onChange={handleChange} />
            <input name="username" type="text" required placeholder="Enter your Username" onChange={handleChange} />
            <input name="email" type="email" required placeholder="Enter your Email" onChange={handleChange} />
            <input name="password" type="password" required placeholder="Create a Password" onChange={handleChange} />
            <input name="roomno" type="text" required placeholder="Enter Room Number" onChange={handleChange} />
            <input name="block" type="text" required placeholder="Enter Hostel Block" onChange={handleChange} />
            <button type="submit" className="form-button">Create Account</button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} className="link1">
                Login here
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SLoginPopup;
