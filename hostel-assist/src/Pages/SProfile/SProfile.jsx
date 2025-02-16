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
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profileImage);
  const navigate = useNavigate();

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    // Implement save functionality here (e.g., API call to upload image and update user data)
    if (selectedImage) {
      // Upload the selected image and update the user's profileImage
      // Example: uploadImage(selectedImage).then((url) => setUser({ ...user, profileImage: url }));
    }
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-image">
          <img src={previewImage} alt="User Profile" />
          {isEditing && (
            <label className="image-upload">
              Change Image
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
              <button type="submit" className="save-button">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
        {!isEditing && (
          <div className="button-group">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Edit
            </button>
            <button onClick={() => navigate('/student')} className="back-button">
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SProfile;
