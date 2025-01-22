import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/teacherProfile.css";
import facebookIcon from "../images/facebook_icon.png";
import twitterIcon from "../images/twitter_icon.png";
import instagramIcon from "../images/instagram_icon.png";

function TeacherProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle edit mode
  const [editFormData, setEditFormData] = useState({});
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      fetchTeacherProfile(username);
    }
  }, [username]);

  const fetchTeacherProfile = (username) => {
    console.log(`Fetching profile for ${username}`);
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    fetch(`${API_URL}/profileTeacher/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setEditFormData(data); // Initialize form data with profile data
      })
      .catch((error) => console.error("Error fetching profile:", error));
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const saveProfileChanges = () => {
    console.log("Save profile changes");
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    fetch(`${API_URL}/api/updateTeacherProfile/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editFormData),
    })    
    .then((response) => response.json())
    .then((data) => {
      setProfileData(data); // Update local state with the updated profile data
      setIsEditMode(false); // Exit edit mode
    })
    .catch((error) => console.error("Error updating profile:", error));
  };

  const handleNestedChange = (event, field) => {
    setEditFormData({
      ...editFormData,
      accountSetup: {
        ...editFormData.accountSetup,
        [field]: event.target.value,
      },
    });
  };
  
  const handleArrayChange = (event, field) => {
    let arrayValues = event.target.value.split(',').map(item => item.trim()).filter(item => item);
    setEditFormData({
      ...editFormData,
      accountSetup: {
        ...editFormData.accountSetup,
        [field]: arrayValues,
      },
    });
  };  

  if (!profileData)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  if (!profileData)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  // Ensure socialMediaLinks is defined here
  const socialMediaLinks = profileData ? [
    {
      name: "Facebook",
      icon: facebookIcon,
      url: profileData.socialMedia?.facebook || "#",
    },
    {
      name: "Twitter",
      icon: twitterIcon,
      url: profileData.socialMedia?.twitter || "#",
    },
    {
      name: "Instagram",
      icon: instagramIcon,
      url: profileData.socialMedia?.instagram || "#",
    },
  ] : [];

  return (
    <div className="main-container">
      <div className="profile-section">
        <div className="user-image"></div>
        <div className="social-media">
          <h2>Social Media Links:</h2>
          <div className="social-media-links">
            {socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-media-link">
                <img src={link.icon} alt={link.name} />
              </a>
            ))}
          </div>
        </div>
        <button className="edit-profile" onClick={toggleEditMode}>
          {isEditMode ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>
      <div className="user-details">
        <form onSubmit={(e) => {e.preventDefault(); saveProfileChanges();}}>
          <div className="user-info">
            <div className="profile-name-and-level">
              <h1>{profileData.username}'s Profile</h1>
              <div className="level-display">Level {profileData.level || 10}</div>
            </div>
            {/* Inline editing for Email */}
            <div className="editable-field">
              <label>Email: </label>
              {isEditMode ? (
                <input type="email" name="email" value={editFormData.email || ''} onChange={handleEditFormChange} />
              ) : (
                <span>{profileData.email}</span>
              )}
            </div>
            {/* Inline editing for Username */}
            <div className="editable-field">
              <label>Username: </label>
              {isEditMode ? (
                <input type="text" name="username" value={editFormData.username || ''} onChange={handleEditFormChange} />
              ) : (
                <span>{profileData.username}</span>
              )}
            </div>
            {/* Static display for Role */}
            <div className="static-field">
              <label>Role: </label>
              <span>{profileData.role}</span>
            </div>
            {/* Inline editing for First Name */}
            <div>
              <label>First Name: </label>
              {isEditMode ? (
                <input type="text" name="firstName" value={editFormData.firstName || ''} onChange={handleEditFormChange} />
              ) : (
                <span>{profileData.firstName}</span>
              )}
            </div>
            {/* Inline editing for Last Name */}
            <div>
              <label>Last Name: </label>
              {isEditMode ? (
                <input type="text" name="lastName" value={editFormData.lastName || ''} onChange={handleEditFormChange} />
              ) : (
                <span>{profileData.lastName}</span>
              )}
            </div>
          </div>
          <div className="account-setup">
            <h2>Account Setup:</h2>
            <ul>
              {/* Inline editing for Location */}
              <li>
                <label>Location: </label>
                {isEditMode ? (
                  <input type="text" name="location" value={editFormData.accountSetup?.location || ''} onChange={(event) => handleNestedChange(event, 'location')} />
                ) : (
                  <span>{profileData.accountSetup?.location}</span>
                )}
              </li>
              {/* Inline editing for Gender */}
              <li>
                <label>Gender: </label>
                {isEditMode ? (
                  <select name="gender" value={editFormData.accountSetup?.gender || ''} onChange={(event) => handleNestedChange(event, 'gender')}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <span>{profileData.accountSetup?.gender}</span>
                )}
              </li>
              {/* Inline editing for Grade Taught */}
              <li>
                <label>Grade Taught: </label>
                {isEditMode ? (
                  <input type="text" name="gradeTaught" value={editFormData.accountSetup?.gradeTaught?.join(", ") || ''} onChange={(event) => handleArrayChange(event, 'gradeTaught')} />
                ) : (
                  <span>{profileData.accountSetup?.gradeTaught?.join(", ")}</span>
                )}
              </li>
              {/* Inline editing for Subjects */}
              <li>
                <label>Subjects: </label>
                {isEditMode ? (
                  <input type="text" name="subjects" value={editFormData.accountSetup?.subjects?.join(", ") || ''} onChange={(event) => handleArrayChange(event, 'subjects')} />
                ) : (
                  <span>{profileData.accountSetup?.subjects?.join(", ")}</span>
                )}
              </li>
              {/* Inline editing for About Me */}
              <li>
                <label>About Me: </label>
                {isEditMode ? (
                  <textarea name="aboutMe" value={editFormData.accountSetup?.aboutMe || ''} onChange={(event) => handleNestedChange(event, 'aboutMe')} />
                ) : (
                  <span>{profileData.accountSetup?.aboutMe}</span>
                )}
              </li>
              {/* Inline editing for Teaches At */}
              <li>
                <label>Teaches At: </label>
                {isEditMode ? (
                  <input type="text" name="teachesAt" value={editFormData.accountSetup?.teachesAt || ''} onChange={(event) => handleNestedChange(event, 'teachesAt')} />
                ) : (
                  <span>{profileData.accountSetup?.teachesAt}</span>
                )}
              </li>
            </ul>
          </div>
          {isEditMode && <button type="submit" className="save-changes-button">Save Changes</button>}
        </form>
      </div>
    </div>
  );  
}

export default TeacherProfile;
