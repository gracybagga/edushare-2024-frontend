import React, { useState, useEffect } from "react";
import "../css/PlaceHolderContent.css";
import axios from "axios";
import UserXp from "./UserXp"
import FieldOfStudy from "./FieldOfStudy";
function PlaceholderContent({ token }) {
  // State to hold the notifications
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchNotifications();
    fetchUserInfo();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const fetchNotifications = async () => {
    try {
      const storedToken = localStorage.getItem("token"); // Use storedToken instead of parameter to avoid confusion
      const notificationsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/notification`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(
        "Notifications fetched:",
        notificationsResponse.data.notifications
      );
      setNotifications(notificationsResponse.data.notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
  const fetchUserInfo = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const userInfoResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/userInfo`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setUserInfo(userInfoResponse.data); // Assuming the API response structure matches the expected
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };
  // Call the function

  // The empty array ensures this effect runs only once after the component mounts

  return (
    <section className="content">
      <div className="placeholder-content">
        <div className="left-content">
          <div className="top-row">
            <div className="content-item large">
            <FieldOfStudy></FieldOfStudy>
            </div>
            <div className="content-item large">
              <UserXp></UserXp> 
            </div>
          </div>
          <div className="bottom-row">
            <div className="content-item small"></div>
            <div className="content-item small"></div>
          </div>
        </div>
        <div className="right-content">
          <div className="content-item medium">
            {/* Display user information here */}
            <div className="userInfo">Welcome {userInfo.name}!</div>
            {/* <div>Username: {userInfo.username}</div>
            <div>Email: {userInfo.email}</div>
            <div>Role: {userInfo.role}</div> */}
          </div>
          <div className="content-item medium">
            {notifications.map((notification, index) => (
              <div key={index} className="notification">
                {notification}
              </div>
            ))}
          </div>
          <div className="content-item medium"></div>
        </div>
      </div>
    </section>

  );
  <div className="placeholder-content">
    {/* Render cards with titles and descriptions */}
    <div className="content-item">
      <h3>Explore Recommendations</h3>
      <p>Discover personalized recommendations based on your interests.</p>
    </div>
    <div className="content-item">
      <h3>Track Your Progress</h3>
      <p>Monitor your activity and see how you're progressing towards your goals.</p>
    </div>
    <div className="content-item">
      <h3>Join Communities</h3>
      <p>Connect with like-minded users in communities relevant to your interests.</p>
    </div>
    <div className="content-item">
      <h3>Discover New Content</h3>
      <p>Find fresh and exciting content tailored to your preferences.</p>
    </div>
    <div className="content-item long-box">
      <h3>Get Inspired</h3>
      <p>Explore stories, articles, and resources to spark inspiration.</p>
    </div>
  </div>
}

export default PlaceholderContent;