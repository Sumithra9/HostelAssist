import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ALoginPopup.css';

const ALoginPopup = ({ setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Hook to navigate to another page

  // Handle Admin login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Admin Login Submitted');
    navigate('/admin'); // Redirect to Admin page on successful login
  };

  // Handle Admin signup
  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Admin Signup Submitted');
    navigate('/admin'); // Redirect to Admin page on successful signup
  };

  const loginForm = (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Admin Login</h2>
      <input type="text" id="ausername" name="ausername" required placeholder="Enter your Username" />
      <input type="password" id='apassword' name='apassword' required placeholder="Enter your Password" />
      <button type="submit" className="form-button">Login</button>
      <p>
        Don't have an account?{' '}
        <span onClick={() => setIsLogin(false)} className="link1">
          Sign up here
        </span>
      </p>
    </form>
  );

  const signupForm = (
    <form onSubmit={handleSignup} className="signup-form">
      <h2>Admin Signup</h2>
      <input type="text" id='aname' name='aname' required placeholder="Enter your name" />
      <input type="email" id='aemail' name='aemail' required placeholder="Enter your email" />
      <input type="password" id='apassword' name='apassword' required placeholder="Create a password" />
      <button type="submit" className="form-button">Create Account</button>
      <p>
        Already have an account?{' '}
        <span onClick={() => setIsLogin(true)} className="link1">
          Login here
        </span>
      </p>
    </form>
  );

  return (
    <div className="loginpopup-overlay">
      <div className="loginpopup">
        <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
        {isLogin ? loginForm : signupForm}
      </div>
    </div>
  );
};

export default ALoginPopup;
