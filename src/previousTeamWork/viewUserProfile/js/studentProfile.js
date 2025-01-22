import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/studentProfile.css'; // Ensure this CSS file replicates the <style> from the HTML

function StudentProfile() {
  const { username } = useParams(); // Capture the username from the URL
  const [profileData, setProfileData] = useState(null);

useEffect(() => {
  // Fetch profile data from the server
  const fetchProfile = async () => {
    const apiUrl = process.env.REACT_APP_API_URL; // Ensure this is defined in your environment
    const endpoint = `${apiUrl}/profileStudent/${username}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  fetchProfile();
}, [username]);


  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
        <div className="profile-section">
            <div className="user-image" style={{ backgroundImage: `url('${profileData.img}')` }}></div>
            <button className="back-button" onClick={() => window.history.back()}>Back</button>
        </div>
        <div className="user-details">
            <div className="user-info">
                <h1>{profileData.username}'s Profile</h1>
                <div className="level-bar">
                    <div className="level-progress">{`Level ${profileData.level}`}</div>
                </div>
                <p>Role: {profileData.role}</p>
                <p>First Name: {profileData.firstName}</p>
                <p>Last Name: {profileData.lastName}</p>
                <p>Username: {profileData.username}</p>
            </div>
            <div className="account-setup">
                <h2>Account Setup:</h2>
                <ul>
                    <li>Location: {profileData.accountSetup.location}</li>
                    <li>Gender: {profileData.accountSetup.gender}</li>
                    <li>Grade Taught: {profileData.accountSetup.gradeTaught?.join(', ')}</li>
                    <li>Subjects: {profileData.accountSetup.subjects?.join(', ')}</li>
                    <li>About Me: {profileData.accountSetup.aboutMe}</li>
                    <li>Teaches At: {profileData.accountSetup.teachesAt}</li>
                    <li>Number of Invites: {profileData.numOfInvites}</li>
                    <li>Added By: {profileData.addedBy}</li>
                    <li>Date Joined: {profileData.dateJoined}</li>
                </ul>
            </div>
        </div>
    </div>
);

}

export default StudentProfile;




