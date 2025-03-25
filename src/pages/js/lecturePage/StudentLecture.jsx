import React, { useEffect, useState } from 'react';
import scholarship from "../../img/scholarship.png";
import {useLocation, useNavigate} from 'react-router-dom';

const StudentLecture = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
  
    // Combined Lecture Data (ID, Title, and Content in one structure)
  const [lectures, setLectures] = useState([
    {
      id: 1,
      title: "Introduction to AI",
      content: `<h2>Lecture 1: Introduction to AI</h2>
        <p>AI, or <strong>Artificial Intelligence</strong>, refers to the simulation of human intelligence...</p>
        <h3>What is AI?</h3>
        <p>Artificial Intelligence involves the creation of intelligent agents that can perform tasks requiring human-like intelligence.</p>
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
        </ul>`
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      content: `<h2>Lecture 2: Machine Learning Basics</h2>
    <p>Machine Learning (ML) is a subset of AI that allows systems to learn from data without explicit programming.</p>
    <h3>Types of Machine Learning</h3>
    <ul>
      <li><strong>Supervised Learning:</strong> Learning from labeled data (e.g., spam detection, image classification).</li>
      <li><strong>Unsupervised Learning:</strong> Identifying patterns in data without labels (e.g., customer segmentation).</li>
      <li><strong>Reinforcement Learning:</strong> Learning through rewards and penalties (e.g., AI playing games).</li>
    </ul>
    <h3>Example: Supervised Learning Algorithm</h3>
    <pre>
      function trainModel(data) {
        let model = {};
        data.forEach(item => {
          model[item.input] = item.output;
        });
        return model;
      }
    </pre>
    <h4>Real-World Applications</h4>
    <ul>
      <li>Spam detection in emails</li>
      <li>Handwriting recognition</li>
      <li>Predictive maintenance in factories</li>
    </ul>`
    },
    {
      id: 3,
      title: "Deep Learning and Neural Networks",
      content:  `<h2>Lecture 3: Deep Learning and Neural Networks</h2>
      <p>Deep Learning is a branch of Machine Learning that uses neural networks to analyze vast amounts of data.</p>
      <h3>What is a Neural Network?</h3>
      <p>A neural network is a set of interconnected layers that process data in a way similar to the human brain.</p>
      <h4>Key Components:</h4>
      <ul>
        <li><strong>Input Layer:</strong> Receives data for processing.</li>
        <li><strong>Hidden Layers:</strong> Perform feature extraction and transformations.</li>
        <li><strong>Output Layer:</strong> Produces predictions or classifications.</li>
      </ul>
      <h3>Example Neural Network Structure:</h3>
      <img src="https://via.placeholder.com/400" alt="Neural Network Diagram" class="img-fluid mt-2"/>
      <h4>Real-World Uses of Deep Learning</h4>
      <ul>
        <li>Image and speech recognition (e.g., Google Assistant, Siri).</li>
        <li>Self-driving cars (e.g., Tesla Autopilot).</li>
        <li>Medical imaging and diagnostics.</li>
      </ul>`
    },
    {
      id: 4,
      title: "Natural Language Processing",
      content: `<h2>Lecture 4: Natural Language Processing (NLP)</h2>
    <p>Natural Language Processing (NLP) is a field of AI that enables machines to understand, interpret, and generate human language.</p>
    <h3>Core Tasks in NLP</h3>
    <ul>
      <li><strong>Tokenization:</strong> Breaking text into words or sentences.</li>
      <li><strong>Sentiment Analysis:</strong> Determining emotional tone in text (e.g., positive, negative).</li>
      <li><strong>Machine Translation:</strong> Converting text between languages (e.g., Google Translate).</li>
      <li><strong>Text-to-Speech & Speech Recognition:</strong> Converting spoken words into text and vice versa.</li>
    </ul>
    <h3>Example: Simple Sentiment Analysis</h3>
    <pre>
      function analyzeSentiment(text) {
        if (text.includes("happy")) return "Positive Sentiment";
        if (text.includes("sad")) return "Negative Sentiment";
        return "Neutral";
      }
    </pre>
    <h4>Applications of NLP</h4>
    <ul>
      <li>Chatbots and Virtual Assistants (e.g., Alexa, Google Assistant).</li>
      <li>Search Engines (e.g., Google, Bing).</li>
      <li>Content Recommendation (e.g., Netflix, YouTube).</li>
    </ul>`
    }
  ]);
  
  const [selectedLectureId, setSelectedLectureId] = useState(lectures[0].id); // Default to first lecture
  const [lectureContent, setLectureContent] = useState(lectures[0].content);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
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
  const selectedLecture = lectures.find(lecture => lecture.id === selectedLectureId);
  if (selectedLecture) {
    setLectureContent(selectedLecture.content);
  }
}, [selectedLectureId, lectures]);

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
        <div className="col-md-4 border-end py-2">
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
