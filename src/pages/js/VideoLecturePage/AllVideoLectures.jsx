import React, { useState, useEffect } from "react";
import scholarship from "../../img/scholarship.png";
import {useLocation, useNavigate} from 'react-router-dom';

const AllVideoLectures = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state?.theme || "dark"; // Extract theme from location.state

  // Sample data simulating backend response
  const sampleVideos = [
    { id: 1, title: "Introduction to React", url: "https://www.youtube.com/embed/Ke90Tje7VS0" },
    { id: 2, title: "Node.js Basics", url: "https://www.youtube.com/embed/fBNz5xF-Kx4" },
    { id: 3, title: "MongoDB Crash Course", url: "https://www.youtube.com/embed/ExcRbA7fy_A" },
    { id: 4, title: "Express.js Tutorial", url: "https://www.youtube.com/embed/L72fhGm1tfE" },
  ];

  const [selectedVideo, setSelectedVideo] = useState(sampleVideos[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     // In real scenario, you'd fetch video data from backend
//   }, []);

  // Theme-based styling
  const isDark = theme === "dark";
  const backgroundStyle = isDark
    ? "linear-gradient(to right, #232526, #414345)" // Dark theme
    : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme

  return (
    <div className="vh-100" style={{ background: backgroundStyle, overflowX:'hidden' }}>
        {/* Navbar */}
        <nav className={`navbar navbar-expand-lg ${isDark ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
            <div className="container-fluid">
                <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                <span className="navbar-brand fw-bold">EduShare</span>
                <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                    ← Course
                </button>
            </div>
        </nav>
        
        <div className="row px-2">
            {/* Video List */}
            <div className="col-md-3 border-end py-2">
                <ul className="list-group">
                    {sampleVideos.map((video) => (
                    <li
                        key={video.id}
                        className={`list-group-item ${selectedVideo.id === video.id ? "active" : ""}`}
                        onClick={() => setSelectedVideo(video)}
                        style={{ cursor: "pointer" }}
                    >
                        {video.title}
                    </li>
                    ))}
                </ul>
            </div>

            {/* Video Player */}
            <div className="col-md-9 px-4 py-1 d-flex flex-column align-items-center">
            <h4 className={`my-1 ${isDark ? "text-light" : " text-dark"}`}>{selectedVideo.title}</h4>
            <div className="ratio ratio-16x9 w-100 px-4">
                <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                allowFullScreen
                className="rounded shadow"
                ></iframe>
            </div>
            </div>
        </div>
        </div>
  );
};

export default AllVideoLectures;
