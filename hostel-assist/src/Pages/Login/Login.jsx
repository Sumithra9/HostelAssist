import React from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
const Login = () => {
  return (
    <div className="login-container" >
      <img src={assets.StudLogin}/>
      <div className="login-section student-section">
        <div className="content">
          <h2>Student Login</h2>
          <p>Submit complaints quickly and easily</p>
          <button className="login-btn">Login as Student</button>
        </div>
      </div>

      <div className="login-section admin-section">
        <div className="content">
          <h2>Admin Login</h2>
          <p>Manage and resolve complaints efficiently</p>
          <button className="login-btn">Login as Admin</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
