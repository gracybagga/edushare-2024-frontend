import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "./TopBar";
import CourseSection from "./CourseSection";
import PlaceholderContent from "./PlaceHolderContent";
import KnowledgeBank from "./KnowledgeBank";
import QuestionForm from "./QuestionForm";
import KB from "./kb";
import "../css/Dashboard.css";
import CreateTest from "./createTest";
import PersonalFile from "./PersonalFile";
import PlaysList from "./PlaysList";

function Dashboard() {
  const [activeContent, setActiveContent] = useState("placeholder");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(""); // Added state for user's role
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [error, setError] = useState(""); // State to manage errors
  const [actualUsername, setActualUsername] = useState("");
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [userXp, setUserXp] = useState('0');
  const [level, setLevel] = useState(1);
  const [badge, setBadge] = useState('Beginner');
  const [middleContent, setMiddleContent] = useState(<PlaceholderContent />); // Set initial content
  const [questionsForKB, setQuestionsForKB] = useState([]);
  const [selectedPlayId, setSelectedPlayId] = useState(null);
  const [playQuestions, setPlayQuestions] = useState([]);
  const [selectedPlay, setSelectedPlay] = useState(""); // Add state for selected play

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        const apiUrl = process.env.REACT_APP_API_URL;

        if (!token) {
          console.error("No token found. Redirecting to login page.");
          setError("You must be logged in to view this page.");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response.data._id);
        setUserName(response.data.name);
        setUserRole(response.data.role);
        setActualUsername(response.data.username);
        console.log("Username set to:", response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleCreateQuestion = () => {
    setActiveContent("questionForm");
  };

  const handleTestButtonClick = () => {
    setActiveContent("KB");
    setSelectedPlay(""); // Reset to PLAYS when searching
  };

  const handleCreateTest = () => {
    setActiveContent("createTest");
  };

  const handleSearch = (search) => {
    setSearch(search);
    setSelectedPlay(""); // Default to PLAYS on search
    setActiveContent("KB");
  };

  const handleSelectQuestions = (questions, playId) => {
    setQuestionsForKB(questions);
    setActiveContent("KB");
    setSelectedPlayId(playId);
    setPlayQuestions(questions);
  };

  const handleCourseClick = (subjectName) => {
    setSelectedSubject(subjectName);
    setActiveContent("courseOptions");
  };

  const handleOptionClick = (option) => {
    if (option === "Plays") {
      setMiddleContent(
        <PlaysList plays={[
          "Romeo and Juliet",
          "Hamlet",
          "Macbeth",
          "Othello",
          "Julius Caesar",
          "A Midsummer Night's Dream",
          "The Tempest",
          "The Merchant of Venice",
          "King Lear",
          "Much Ado About Nothing"
        ]} onSelectPlay={handleSelectPlay} />
      );
    } else {
      setMiddleContent(<div>{option} content is not available yet.</div>);
    }
    setActiveContent("plays");
  };

  const handleBookmarkClick = () => {
    setActiveContent("personalFile");
  };

  const resetDashboard = () => {
    setActiveContent("placeholder");
    setMiddleContent(<PlaceholderContent />);
  };

  const handleSelectPlay = (play) => {
    setSelectedPlay(play);
    setActiveContent("KB");
  };

  return (
    <div className="dashboard">
      <CourseSection
        onCourseClick={handleCourseClick}
        token={sessionStorage.getItem("token")}
        onOptionClick={handleOptionClick} // Ensure onOptionClick is passed to CourseSection
        resetDashboard={resetDashboard} // Pass the resetDashboard function
      />
      <div className="dashboard-main-content">
        <TopBar
          userName={userName}
          userRole={userRole}
          actualUsername={actualUsername}
          onCreateQuestion={handleCreateQuestion}
          onTestButtonClick={handleTestButtonClick}
          onSearch={handleSearch} // Make sure this is passed
          onCreateTest={handleCreateTest}
          onBookmarkClick={handleBookmarkClick}
          token={sessionStorage.getItem("token") || localStorage.getItem("token")}
        />
        {error && <div className="error">{error}</div>}
        {activeContent === "createTest" ? (
          <CreateTest
            token={
              sessionStorage.getItem("token") || localStorage.getItem("token")
            }
          />
        ) : activeContent === "KB" ? (
          <KB search={search} subject={selectedSubject} playQuestions={playQuestions} selectedPlayId={selectedPlayId} selectedPlay={selectedPlay} />
        ) : activeContent === "questionForm" ? (
          <QuestionForm
            token={
              sessionStorage.getItem("token") || localStorage.getItem("token")
            }
          />
        ) : activeContent === "personalFile" ? (
          <PersonalFile
            userId={userId}
            token={
              sessionStorage.getItem("token") || localStorage.getItem("token")
            }
            userName={userName}
          />
        ) : activeContent === "courseOptions" ? (
          middleContent
        ) : (
          <PlaceholderContent />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
