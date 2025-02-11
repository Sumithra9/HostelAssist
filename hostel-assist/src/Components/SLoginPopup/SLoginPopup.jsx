import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import './SLoginPopup.css';

const SLoginPopup = ({ setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Hook to navigate to another page

  // Handle Student login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Student Login Submitted');
    navigate('/student'); // Redirect to Student page on successful login
  };

  // Handle Student signup
  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Student Signup Submitted');
    navigate('/student'); // Redirect to Student page on successful signup
  };

  const loginForm = (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Student Login</h2>
      <input id="susername" name="susername" type="text" required placeholder="Enter your Username" />
      <input  id="spassword" name="spassword" type="password" required placeholder="Enter your Password" />
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
      <h2>Student Signup</h2>
      <input id="sname" name="sname"  type="text" required placeholder="Enter your Name" />
      <input id="susername" name="susername" type="text" required placeholder="Enter your Username" />
      <input id="semail" name="semail" type="email" required placeholder="Enter your Email" />
      <input id="spassword" name="spassword" type="password" required placeholder="Create a Password" />
      <input id="roomno" name="roomno" type="text" required placeholder="Enter Room Number"/>
      <input id="block" name="block" type="text" required placeholder="Enter Hostel Block"/>
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

export default SLoginPopup;