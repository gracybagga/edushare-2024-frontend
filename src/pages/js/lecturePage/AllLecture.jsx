import React, { useEffect, useState } from 'react';
import scholarship from "../../img/scholarship.png";
import {useLocation, useNavigate} from 'react-router-dom';
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";

const AllLecture = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
    const lectureIdArray = location.state?.lectureIdArray || [];
    const courseId = location.state?.courseId || 'hello';
  
    // Combined Lecture Data (ID, Title, and Content in one structure)
    const [lectures, setLectures] = useState([]);
    const [currentLecture, setCurrentLecture] = useState(null); // Default
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currUserRole = localStorage.getItem('userRole');
    const btnLink = currUserRole === 'STUDENT' ? '/student-course-dashboard' : '/teacher-course-dashboard';

    //---------------------------------------
    useEffect(() => {
        const fetchLectures = async () => {
            setLoading(true);
            setError(null);

            if (!lectureIdArray) {
              setLoading(false);
              setError("No lectures available.");
              console.log("No lecture")
              return;
            }

            try {
                let token = localStorage.getItem('token');
                console.log("token accessed")
                if (currUserRole !== 'STUDENT' && currUserRole !== 'TEACHER') {
                    setError("You are not authorized to access these lectures.");
                    setLoading(false);
                    return;
                }
                console.log("role passed")
                const response = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/lectures/alllecturespercourse/${courseId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Accept": "application/json",
                    }
                });
                // console.log(response)
                if (!response.ok) {
                    throw new Error('Failed to fetch lectures');
                }

                const result = await response.json();
                if (result.data.length === 0) {
                    setError("No lectures available.");
                } else {
                    setLectures(result.data);
                    setCurrentLecture(result.data[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLectures();
    }, [courseId]);

    //---------------------------------------
    // // Intially setting up the current lecture
    // useEffect(() => {
    //   console.log(lectures);
    //   if (lectures.length > 0) {
    //     setCurrentLecture(lectures[0]);
    //   }
    // }, [lectures]);

    // Theme-based styling
    const isDark = theme === "dark";
    const backgroundStyle = isDark ? "linear-gradient(to right, #232526, #414345)" : "linear-gradient(to right, #faf8ff, #ebe4ff)";

    return (
        <div>
            <LoadingAndErrorComponent loading={loading} error={error}/>

            {!loading && !error && (
                <div className="vh-100" style={{background: backgroundStyle, overflowX: 'hidden'}}>
                    {/* Navbar */}
                    <nav
                        className={`navbar navbar-expand-lg ${theme === "light" ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                        <div className="container-fluid">
                          <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                          <span className="navbar-brand fw-bold">EduShare</span>
                          <button className="btn btn-primary rounded-pill" onClick={() => navigate(btnLink, { state: { courseId }})}>
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
                                        key={lecture._id}
                                        className={`list-group-item ${currentLecture._id === lecture._id ? "active" : ""}`}
                                        onClick={() => setCurrentLecture(lecture)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <span>{lecture.id}</span>
                                      {lecture.title}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column: Lecture Content */}
                        <div className="col-md-8 p-4">
                          <LectureContent isDark={isDark} currentLecture={currentLecture} />
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

function LectureContent({isDark, currentLecture}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lectureContent, setLectureContent] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      if (!currentLecture || !currentLecture.description) {
        setLoading(false);
        setError("No Lecture data available.");
        return;
      }

      let currUserRole = localStorage.getItem('userRole');
      if (currUserRole === 'STUDENT' || currUserRole === 'TEACHER') {
        try {
          setLoading(true);
          setError(null);
          let token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/content/lectures/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              "Accept": "application/json",
            },
            body: JSON.stringify({topic:currentLecture.description})
          });
          if (!response.ok) {
            throw new Error('Lecture note could note be fetched');
          }
          const result = await response.json();
          console.log(result);
          // Purge the lecture data to remove unnecessary or invalid items
          let lectureData = result.content;
          if(lectureData) {
              console.log('lecture data arrived from backend');
              setLoading(false);
          } else {
              console.log('lecture data not arrived from backend');
          }

          setLectureContent(lectureData); // Set only valid lectures
        } catch (error) {
          setError(error.message);
            setLoading(false);
        } finally {
          // setLoading(false);
        }
      }
    };

    fetchLecture();
  }, [currentLecture]); // Dependency array includes currentLecture

  if (loading) return <><p>Loading...</p></>;
  if (error) return <p>Error: {error}</p>;
  return (
      <div id="lectureContent" className={`${isDark ? "text-light" : " text-dark"}`} dangerouslySetInnerHTML={{__html: lectureContent}}/>
  )
}

export default AllLecture;

/*
* const [lectures, setLectures] = useState([
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
* */
