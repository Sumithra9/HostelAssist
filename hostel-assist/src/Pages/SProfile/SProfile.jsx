import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SProfile.css";
import { assets } from "../../assets/assets";

const SProfile = () => {
  const navigate = useNavigate();

  // ✅ Fetch user details from localStorage (stored after login)
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState({
    profileImage: assets.image, // Default image
    name: storedUser.name || "",
    email: storedUser.email || "",
    hostelBlock: storedUser.block || "",
    roomNumber: storedUser.roomno || "",
    username: storedUser.username || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null); // For error handling

  // ✅ Fetch user data from backend (optional, if needed)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser({
            profileImage: assets.image, // Default image or user-specific image
            name: data.name || storedUser.name,
            email: data.email || storedUser.email,
            hostelBlock: data.block || storedUser.hostelBlock,
            roomNumber: data.roomno || storedUser.roomNumber,
            username: data.username || storedUser.username,
          });
        } else {
          setError(data.message || "Failed to load profile.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // setError("Something went wrong while fetching your data.");
      }
    };

    fetchUserData();
  }, []);

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: imageUrl,
      }));
    }
  };

  // ✅ Save updated profile data
  const handleSave = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.name || !user.hostelBlock || !user.roomNumber || !user.username) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          hostelBlock: user.hostelBlock,
          roomNumber: user.roomNumber,
          username: user.username,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(user)); // Update local storage
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // ✅ Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to home/login
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-image">
          <img src={user.profileImage} alt="User Profile" />
          {isEditing && (
            <label className="image-upload">
              <b>Change Image</b>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          )}
        </div>

        {/* Show error message if fetch fails */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSave}>
          <div className="detail-item">
            <label className="detail-label">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.name}</span>
            )}
          </div>

          <div className="detail-item">
            <label className="detail-label">Email:</label>
            <span className="detail-value">{user.email}</span>
          </div>

          <div className="detail-item">
            <label className="detail-label">Hostel Block:</label>
            {isEditing ? (
              <input
                type="text"
                name="hostelBlock"
                value={user.hostelBlock}
                onChange={handleInputChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.hostelBlock}</span>
            )}
          </div>

          <div className="detail-item">
            <label className="detail-label">Room Number:</label>
            {isEditing ? (
              <input
                type="text"
                name="roomNumber"
                value={user.roomNumber}
                onChange={handleInputChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.roomNumber}</span>
            )}
          </div>

          {/* <div className="detail-item">
            <label className="detail-label">Phone Number:</label>
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.phoneNumber}</span>
            )}
          </div> */}

          <div className="detail-item">
            <label className="detail-label">Username:</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.username}</span>
            )}
          </div>

          {isEditing && (
            <div className="button-group">
              <button type="submit" className="button save-button">
                <b>Save</b>
              </button>
              <button type="button" onClick={handleCancel} className="button cancel-button">
                <b>Cancel</b>
              </button>
            </div>
          )}
        </form>

        {!isEditing && (
          <div className="button-group">
            <button onClick={() => setIsEditing(true)} className="button edit-button">
              <b>Edit</b>
            </button>
            <button onClick={() => navigate("/student")} className="button back-button">
              Go Back
            </button>
          </div>
        )}
      </div>

      <button onClick={handleSignOut} className="button sign-out-button">
        Sign Out
      </button>
    </div>
  );
};

export default SProfile;
