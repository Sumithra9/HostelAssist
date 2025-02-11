import React,{useState} from "react";
import { assets } from "../../assets/assets";
import SLoginPopup from "../../Components/SLoginPopup/SLoginPopup";
import ALoginPopup from "../../Components/ALoginPopup/ALoginPopup";
import "./Login.css";

const Login = () => {
  const [showSLogin, setShowSLogin] = useState(false);
  const [showALogin, setShowALogin] = useState(false);

  return (
    <>
    <div className="login-container">
      <div className="login-options">
        <div className="login-box">
        <h2>Student</h2>
          <div className="circle">
            <img src={assets.StudLogin} alt="Student" />
          </div>
          <button onClick={() => setShowSLogin(true)}>Login</button> {/* Show user login popup */}
        </div>
        <div className="login-box">
        <h2>Admin</h2>
          <div className="circle">
            <img src={assets.AdminLogin} alt="Admin" />
          </div>
          <button onClick={() => setShowALogin(true)}>Login</button> {/* Show admin login popup */}
        </div>
      </div>
      {showSLogin && <SLoginPopup setShowLogin={setShowSLogin} />} {/* User login popup */}
      {showALogin && <ALoginPopup setShowLogin={setShowALogin} />} {/* Admin login popup */}
    </div>
    </>
  )
}

export default Login