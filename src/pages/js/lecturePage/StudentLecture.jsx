import React, { useEffect, useState } from 'react';
import scholarship from "../../img/scholarship.png";
import {useLocation, useNavigate} from 'react-router-dom';

const StudentLecture = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
  // Sample data for lectures
  const [lectures, setLectures] = useState([
    { id: 1, title: 'Introduction to AI' },
    { id: 2, title: 'Machine Learning Basics' },
    { id: 3, title: 'Deep Learning and Neural Networks' },
    { id: 4, title: 'Natural Language Processing' },
  ]);
  
  const [selectedLectureId, setSelectedLectureId] = useState(1);
  const [lectureContent, setLectureContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample content for each lecture
  const lectureContents = {
    1: `<h2>Lecture 1: Introduction to AI</h2>
    <p>AI, or <strong>Artificial Intelligence</strong>, refers to the simulation of human intelligence...</p>
    <h3>What is AI?</h3>
    <p>Artificial Intelligence involves the creation of intelligent agents. Artificial Intelligence involves the creation of intelligent agents. Artificial Intelligence involves the creation of intelligent agents. Artificial Intelligence involves the creation of intelligent agents. Artificial Intelligence involves the creation of intelligent agents. Artificial Intelligence involves the creation of intelligent agents. Artificial Intelligence involves the creation of intelligent agents. Artificial Intelligence involves the creation of intelligent agents. </p>
    <h4>Types of AI:</h4>
    <ul>
      <li><em>Reactive Machines</em></li>
      <li><em>Limited Memory</em></li>
      <li><em>Theory of Mind</em></li>
      <li><em>Self-Aware AI</em></li>
    </ul>
    <h4>Applications of AI</h4>
    <ul>
      <li>Healthcare</li>
      <li>Finance</li>
      <li>Education</li>
      <li>Entertainment</li>
      <li>Manufacturing</li>
    </ul>`,
    2: "<h2>Machine Learning Basics</h2><p>Machine Learning is a subset of AI that allows systems to learn from data without explicit programming...</p>",
    3: "<h2>Deep Learning and Neural Networks</h2><p>Deep Learning is a branch of Machine Learning that uses neural networks to learn from large datasets...</p>",
    4: "<h2>Natural Language Processing</h2><p>Natural Language Processing (NLP) is a field of AI that enables machines to understand and process human languages...</p>"
  };
//---------------------------------------
// useEffect(() => {
//   const fetchLectures = async () => {
//       setLoading(true);
//       setError(null);
//
//       try {
//           let currUserRole = localStorage.getItem('userRole');
//           if (currUserRole !== 'STUDENT') {
//               setError("You are not authorized to access these lectures.");
//               setLoading(false);
//               return;
//           }
//
//           const response = await fetch(`${process.env.VITE_EDUSHARE_BACKEND_URL}/api/lectures`, {
//               method: 'GET',
//               headers: {
//                   "Content-Type": "application/json",
//                   "X-Requested-With": "XMLHttpRequest",
//                   "Accept": "application/json",
//               }
//           });
//
//           if (!response.ok) {
//               throw new Error('Failed to fetch lectures');
//           }
//
//           const result = await response.json();
//           if (result.length === 0) {
//               setError("No lectures available.");
//           } else {
//               setLectures(result);
//               setSelectedLectureId(result[0].id);
//           }
//       } catch (err) {
//           setError(err.message);
//       } finally {
//           setLoading(false);
//       }
//   };
//   // fetchLectures();
// }, []);

//---------------------------------------
  // Update content based on selected lecture
  useEffect(() => {
    setLectureContent(lectureContents[selectedLectureId]);
  }, [selectedLectureId]);

  // Handle lecture selection
  const handleLectureSelect = (id) => {
    setSelectedLectureId(id);
  };

  // Theme-based styling
  const isDark = theme === "dark";
  const backgroundStyle = isDark
    ? "linear-gradient(to right, #232526, #414345)" // Dark theme
    : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme

  return (
    <div className="vh-100" style={{ background: backgroundStyle, overflowX:'hidden' }}>
        {/* Navbar */}
              <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                <div className="container-fluid">
                  <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                  <span className="navbar-brand fw-bold">EduShare</span>
                  <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                    ← Course
                  </button>
                </div>
              </nav>
      <div className="row px-2">
        {/* Left Column: List of Lectures */}
        <div className="col-md-4 py-2">
          <ul className="list-group">
            {lectures.map((lecture) => (
              <li
                key={lecture.id}
                className={`list-group-item ${selectedLectureId === lecture.id ? 'active' : ''}`}
                onClick={() => handleLectureSelect(lecture.id)}
                style={{ cursor: 'pointer' }}
              >
                {lecture.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Lecture Content */}
        <div className="col-md-8 p-4">
          <div id="lectureContent" className={`${isDark ? "text-light" : " text-dark"}`} dangerouslySetInnerHTML={{ __html: lectureContent }} />
        </div>
      </div>
    </div>
  );
};

export default StudentLecture;
