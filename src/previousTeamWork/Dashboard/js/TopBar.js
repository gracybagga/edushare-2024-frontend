import React, { useState, useEffect } from "react";
import "../css/TopBar.css";
import Modal from "./Modal"; // Make sure to import the Modal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faRocket,
  faBell,
  faBars,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import createNotification from "../../../notificationAPI";
import ChatMenu from './ChatMenu';

function TopBar({
  userName,
  onCreateQuestion,
  onTestButtonClick,
  userRole,
  actualUsername,
  onSearch,
  onCreateTest,
  onBookmarkClick,
  token,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [dropdownSelection, setDropdownSelection] = useState("KB");
  const [dropdownOptionsVisible, setDropdownOptionsVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (search) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/plays/search`, {
            params: { query: search },
            headers: { Authorization: `Bearer ${token}` },
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [search, token]);

  const fetchNotifications = async () => {
    try {
      const notificationsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/notification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(notificationsResponse.data.notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    switch (menuItem) {
      case "Profile":
        if (userRole === "teacher") {
          navigate(`/teacherProfile/${actualUsername}`);
        } else if (userRole === "student") {
          navigate(`/studentProfile/${actualUsername}`);
        }
        break;
      case "Invite Teacher":
        setIsModalOpen(true);
        break;
      case "Log out":
        localStorage.removeItem("token");
        navigate("/login");
        break;
      default:
        console.log(`${menuItem} clicked`);
    }
    setDropdownVisible(false);
  };

  const handleInvite = async () => {
    const data = {
      email: email,
      invitedBy: "admin",
      invitedName: "Default Invited Teacher Name",
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/codes`,
        data,
        { withCredentials: true }
      );
      await createNotification("Invite Sent", token);
      setIsModalOpen(false);
      setEmail("");
    } catch (error) {
      console.error("Error sending invitation:", error.response?.data || error.message);
    }
  };

  const handleDropdownSelection = (selection) => {
    setDropdownSelection(selection);
    setDropdownOptionsVisible(false);
  };

  const handleSearchButtonClick = () => {
    if (dropdownSelection === "Teacher") {
      navigate(`/teacherProfile/${search}`);
    } else if (dropdownSelection === "Student") {
      navigate(`/studentProfile/${search}`);
    } else if (dropdownSelection === "KB") {
      onSearch(search);
    }
  };

  const handleCreateTestButtonClick = () => {
    onCreateTest();
  };

  const handleBookmarkClick = () => {
    onBookmarkClick();
  };

  const toggleChatMenu = () => {
    setIsChatMenuOpen(!isChatMenuOpen);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-actions">
        <button onClick={handleCreateTestButtonClick}>Create Test</button>
      </div>
      <div className="search-bar">
        <div className="search-dropdown">
          <button onClick={() => setDropdownOptionsVisible(!dropdownOptionsVisible)}>
            {dropdownSelection}
          </button>
          {dropdownOptionsVisible && (
            <div className="search-dropdown-content">
              <button onClick={() => handleDropdownSelection("KB")}>KB</button>
              <button onClick={() => handleDropdownSelection("Teacher")}>Teacher</button>
              <button onClick={() => handleDropdownSelection("Student")}>Student</button>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Search Content"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" onClick={handleSearchButtonClick}>
          Search
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
        <div>
          <button onClick={onCreateQuestion}>Create Question</button>
        </div>
      </div>
      <div className="top-bar-icons">
        <FontAwesomeIcon icon={faBookmark} className="icon" onClick={handleBookmarkClick} />
        <FontAwesomeIcon icon={faComment} className="icon" onClick={toggleChatMenu} />
        {isChatMenuOpen && <ChatMenu onClose={() => setIsChatMenuOpen(false)} isOpen={isChatMenuOpen} />}
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <FontAwesomeIcon icon={faBars} className="icon" />
          {dropdownVisible && (
            <div className="dropdown-content">
              <button onClick={() => handleMenuItemClick("Profile")}>Profile</button>
              <button onClick={() => handleMenuItemClick("Settings")}>Settings</button>
              <button onClick={() => handleMenuItemClick("Invite Teacher")}>Invite Teacher</button>
              <button onClick={() => handleMenuItemClick("Privacy and Policy")}>Privacy and Policy</button>
              <button onClick={() => handleMenuItemClick("Feedback")}>Feedback</button>
              <button onClick={() => handleMenuItemClick("Help")}>Help</button>
              <button onClick={() => handleMenuItemClick("Log out")}>Log out</button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <h2>Invite Teacher to EduShare</h2>
          <input
            type="email"
            placeholder="Please enter teacher's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>Code will be sent through email</h3>
          <button className="modalButton" onClick={handleInvite}>Send Invite</button>
        </Modal>
      )}
    </div>
  );
}

export default TopBar;

