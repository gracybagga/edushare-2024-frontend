// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "../css/Header.css";
// import "../css/teacherProfile.css";

// function TeacherProfile() {
//     const [profileData, setProfileData] = useState(null);
//     const { username } = useParams();

//     useEffect(() => {
//         if (username) {
//             fetchTeacherProfile(username);
//         }
//     }, [username]);

//     const fetchTeacherProfile = (username) => {
//         console.log(`Fetching profile for ${username}`);
    
//         fetch(`http://localhost:3001/profileTeacher/${username}`)
//             .then(response => {
//                 console.log(response); // Log the raw response
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok, status: ${response.status}`);
//                 }
                
//                 // Check content type before parsing as JSON
//                 const contentType = response.headers.get("content-type");
//                 if (contentType && contentType.includes("application/json")) {
//                     return response.json();
//                 } else {
//                     // Handle non-JSON response (e.g., send an error message)
//                     return response.text().then(data => {
//                         throw new Error(`Response is not JSON: ${data}`);
//                     });
//                 }
//             })
//             .then(data => {
//                 console.log(data); // Log the received data
//                 setProfileData(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching profile:', error);
//             });
//     };
    
//     if (!profileData) return <div>Loading...</div>;

//     return (
//         <div className="main-container">
//             <div className="profile-section">
//                 <div className="user-image"></div>
//                 <button className="back-button">Back</button>
//             </div>
//             <div className="user-details">
//                 <div className="user-info">
//                     <h1>{profileData.username}'s Profile</h1>
//                     <div className="level-bar">
//                         <div className="level-progress">Level 10</div>
//                     </div>
//                     <p>Role: {profileData.role}</p>
//                     <p>First Name: {profileData.firstName}</p>
//                     <p>Last Name: {profileData.lastName}</p>
//                     <p>Username: {profileData.username}</p>
//                 </div>
//                 <div className="account-setup">
//                     <h2>Account Setup:</h2>
//                     <ul>
//                         <li>Location: {profileData.accountSetup?.location}</li>
//                         <li>Gender: {profileData.accountSetup?.gender}</li>
//                         <li>Grade Taught: {profileData.accountSetup?.gradeTaught.join(', ')}</li>
//                         <li>Subjects: {profileData.accountSetup?.subjects}</li>
//                         <li>About Me: {profileData.accountSetup?.aboutMe}</li>
//                         <li>Teaches At: {profileData.accountSetup?.teachesAt}</li>
//                         <li>Number of Invites: {profileData.numOfInvites}</li>
//                         <li>Added By: {profileData.addedBy}</li>
//                         <li>Date Joined: {profileData.dateJoined}</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );

// }

// export default TeacherProfile;




