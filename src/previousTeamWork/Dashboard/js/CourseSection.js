import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import createNotification from '../../../notificationAPI';
import "../css/CourseSection.css";
import image1 from "../img/logoEd.png";
import Modal from './Modal'; // Adjust the path based on your file structure

function CourseSection({ token, userName, onCourseClick, onOptionClick, resetDashboard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const decodedToken = jwtDecode(token);
  const [allSubjects, setAllSubjects] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAddSubjectVisible, setIsAddSubjectVisible] = useState(false);
  const [isNewCourseFormVisible, setIsNewCourseFormVisible] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseGrade, setNewCourseGrade] = useState("");
  const [actualUsername, setActualUsername] = useState('');
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  // Define the keyword-based options mapping
  const keywordOptions = {
    "English": ["Books", "Plays", "Essays", "Languages", "Grammar"],
    "History": ["History", "Quizzes", "Essays"],
    "Biology": ["Experiments", "Science", "Quizzes", "Reports"],
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = decodedToken._id;

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setActualUsername(response.data.username);
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token) {
      fetchSubjects();
      fetchAllSubjects();
      fetchUserProfile();
    }
  }, [token]);

  const fetchSubjects = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl || !token) {
      console.error("API URL or authentication token is not defined.");
      return;
    }

    try {
      const { _id: userId, role } = jwtDecode(token);

      let endpoint = `${apiUrl}/api/user/${role}/${userId}/subjects`;
      if (role !== "teacher" && role !== "student") {
        console.error("Unauthorized: Role not supported.");
        return;
      }

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!Array.isArray(response.data)) {
        console.error("Invalid response data format: Expected an array of subject IDs.");
        return;
      }

      const subjectsWithNames = await Promise.all(response.data.map(async (subjectId) => {
        try {
          const nameResponse = await axios.get(`${apiUrl}/api/subject-name/${subjectId}`);
          return { id: subjectId, name: nameResponse.data.subjectName || "Unknown" };
        } catch (error) {
          console.error(`Error fetching name for subject ${subjectId}:`, error);
          return { id: subjectId, name: "Unknown" };
        }
      }));

      setSubjects(subjectsWithNames);
    } catch (error) {
      console.error(`Error fetching subjects:`, error);
      setSubjects([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewProfile = () => {
    if (userRole === "teacher") {
      navigate(`/teacherProfile/${actualUsername}`);
    } else if (userRole === "student") {
      navigate(`/studentProfile/${actualUsername}`);
    }
  };

  const fetchAllSubjects = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/subjects/allsubjects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const subjectsWithNames = await Promise.all(
        response.data.map(async (subject) => {
          try {
            const nameResponse = await axios.get(`${apiUrl}/api/subject-name/${subject._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return { id: subject._id, name: nameResponse.data.subjectName };
          } catch (error) {
            console.error(`Error fetching name for subject ${subject._id}:`, error);
            return { id: subject._id, name: "Unknown" };
          }
        })
      );

      setAllSubjects(subjectsWithNames);

      subjectsWithNames.forEach(subject => {
        console.log(`Subject ID: ${subject.id}, Name: ${subject.name}`);
      });
    } catch (error) {
      console.error('Error fetching all subjects:', error);
      setAllSubjects([]);
    }
  };

  const handleAddClick = () => {
    setIsDropdownVisible(!isDropdownVisible);

    if (isAddSubjectVisible) {
      setIsAddSubjectVisible(false);
      setIsNewCourseFormVisible(false);
    } else {
      setIsAddSubjectVisible(true);
      if (!allSubjects.length) {
        fetchAllSubjects();
      }
    }
  };

  const toggleNewCourseFormVisibility = () => {
    setIsNewCourseFormVisible(!isNewCourseFormVisible);
    setIsAddSubjectVisible(false);
  };

  const handleAddSubjectClick = async () => {
    try {
      if (!selectedSubject) {
        console.error("No subject selected.");
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL;
      const role = decodedToken.role;
      const userId = decodedToken._id;

      const endpoint = `${apiUrl}/api/user/${role}/account-setup/${userId}`;
      const requestBody = {
        accountSetup: { subjects: [selectedSubject] }
      };

      const response = await axios.put(endpoint, requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await createNotification("Course Added", token);
      console.log("Subject added successfully to account setup:", response.data);

      fetchSubjects();
    } catch (error) {
      console.error("Error adding subject to account setup:", error);
    }
  };

  const handleCreateNewCourse = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const newSubjectResponse = await axios.post(`${apiUrl}/api/subject`, {
        gradeLevel: newCourseGrade,
        subject: newCourseName
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await createNotification("New Course Created", token);

      console.log("New subject created successfully:", newSubjectResponse.data);

      const newSubjectId = newSubjectResponse.data._id;

      const updateEndpoint = `${apiUrl}/api/user/${decodedToken.role}/account-setup/${decodedToken._id}`;
      const updateResponse = await axios.put(updateEndpoint, {
        accountSetup: { subjects: [newSubjectId] }
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Account setup updated successfully:", updateResponse.data);

      fetchSubjects();

      setNewCourseName("");
      setNewCourseGrade("");
      setIsNewCourseFormVisible(false);
    } catch (error) {
      console.error("Error creating new subject or updating account setup:", error);
    }
  };

  const handleSubjectClick = (subjectName) => {
    onCourseClick(subjectName);
    setSelectedCourse(selectedCourse === subjectName ? "" : subjectName); // Toggle the selected course
  };

  const getOptionsForCourse = (courseName) => {
    for (let keyword in keywordOptions) {
      if (courseName.includes(keyword)) {
        return keywordOptions[keyword];
      }
    }
    return [];
  };

  const handleOptionClick = (option) => {
    onOptionClick(option);
  };

  const handleLogoClick = () => {
    resetDashboard();
  };

  return (
    <div className="dashboard">
      <aside className="subject-section">
        <div className="EduShare-Logo" onClick={handleLogoClick}> {/* Add onClick handler */}
          <img src={image1} alt="EduShare Logo" />
          <h2 className="edushare-text">EduShare</h2>
        </div>
        <div className="horizontal-separator"></div>
        <div className="subject-header">
          <h2 className="subject-heading">Subjects</h2>
        </div>
        
        <ul className="subject-list">
          {subjects.map((subject) => (
            <li key={subject.id} onClick={() => handleSubjectClick(subject.name)}>
              {subject.name}
              {subject.name === selectedCourse && (
                <ul className="options-list">
                  {getOptionsForCourse(subject.name).map((option, index) => (
                    <li key={index} className="option-item" onClick={() => handleOptionClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="add-course-container">
          <button className="add-course-button" onClick={() => setIsModalOpen(true)}>+</button>
        </div>

        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <div className="modal-section">
            <h2>Add Subject</h2>
            <select onChange={(e) => setSelectedSubject(e.target.value)}>
              {allSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
            <button className="modal-button" onClick={handleAddSubjectClick}>Add Selected Subject</button>
          </div>

          <div className="modal-section">
            <h2>Create New Course</h2>
            <form onSubmit={handleCreateNewCourse}>
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="New Course Name"
                required
              />
              <input
                type="text"
                value={newCourseGrade}
                onChange={(e) => setNewCourseGrade(e.target.value)}
                placeholder="Grade"
                required
              />
              <button className="modal-button" type="submit">Submit New Course</button>
            </form>
          </div>
        </Modal>

        <div className="horizontal-separator"></div>
        <div className="profile-and-logout-container">
          <button onClick={handleViewProfile} className="profile-button">Profile</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </aside>
    </div>
  );
}

export default CourseSection;
