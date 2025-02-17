// SProfile.js
import React, { useState } from 'react';
import './SProfile.css';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const SProfile = () => {
  const [user, setUser] = useState({
    profileImage: assets.image,
    name: 'John Doe',
    email: 'johndoe@example.com',
    hostelBlock: 'A',
    roomNumber: '101',
    phoneNumber: '123-456-7890',
    username: 'johndoe',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

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

  const handleSave = (e) => {
    e.preventDefault();
    // Implement save functionality here (e.g., API call)
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset user data or fetch the original data again
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // Implement sign-out functionality here (e.g., clearing auth tokens)
    navigate('/'); // Navigate to the home page
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
          <div className="detail-item">
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
          </div>
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
            <button
              onClick={() => setIsEditing(true)}
              className="button edit-button"
            >
              <b>Edit</b>
            </button>
            <button onClick={() => navigate('/student')} className="button back-button">
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
