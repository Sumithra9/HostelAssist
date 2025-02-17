import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SLoginPopup.css";
import { registerUser, loginUser } from "../../api/auth"; // Import API calls

const SLoginPopup = ({ setShowLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        roomno: "",
        block: "",
        phoneno:"",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ 
                username: formData.username, 
                password: formData.password 
            });
            localStorage.setItem("user", JSON.stringify(data)); // Store user session
            navigate("/student"); // Redirect to student page
        } catch (err) {
            setError(err.response?.data?.message || "Login failed!");
        }
    };

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            localStorage.setItem("user", JSON.stringify(data)); // Store user session
            navigate("/student"); // Redirect to student page
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="loginpopup-overlay">
            <div className="loginpopup">
                <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>

                {error && <p className="error-message">{error}</p>}

                {isLogin ? (
                    <form onSubmit={handleLogin} className="login-form">
                        <h2>Student Login</h2>
                        <input name="username" type="text" required placeholder="Enter your Username" onChange={handleChange} />
                        <input name="password" type="password" required placeholder="Enter your Password" onChange={handleChange} />
                        <button type="submit" className="form-button">Login</button>
                        <p>
                            Don't have an account?{' '}
                            <span onClick={() => setIsLogin(false)} className="link1">Sign up here</span>
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
                        <input name="phoneno" type="text" required placeholder="Enter Phone Number" onChange={handleChange} />
                        <button type="submit" className="form-button">Create Account</button>
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setIsLogin(true)} className="link1">Login here</span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SLoginPopup;
