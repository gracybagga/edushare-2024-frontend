import React, { useState, useEffect } from "react";
import scholarship from "../../img/scholarship.png";
import {useLocation, useNavigate} from 'react-router-dom';
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";

const AllVideoLectures = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state?.theme || "dark"; // Extract theme from location.state
  const videoIdArray = location.state?.videoIdArray || [];
  const courseId = location.state?.courseId || '';

  // Sample data simulating backend response
  const [videos, setVideos]  = useState([]);

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchVideos = async () => {
          setLoading(true);
          setError(null);

          if (!videoIdArray) {
              setLoading(false);
              setError("No videos available.");
              return;
          }

          try {
              let currUserRole = localStorage.getItem('userRole');
              let token = localStorage.getItem('token');

              if (currUserRole !== 'STUDENT' || currUserRole !== 'TEACHER') {
                  setError("You are not authorized to access these lectures.");
                  setLoading(false);
                  return;
              }

              const response = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/videos/${courseId}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      "Content-Type": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                      "Accept": "application/json",
                  }
              });

              if (!response.ok) {
                  throw new Error('Failed to fetch videos');
              }

              const result = await response.json();
              if (result.data.length === 0) {
                  setError("No videos available.");
              } else {
                  setVideos(result.data);
              }
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };
      fetchVideos();
  }, [courseId]);
    // Intially setting up the current videos
    useEffect(() => {
        console.log(videos);
        if (videos.length > 0) {
            setSelectedVideo(videos[0]);
        }
    }, [videos]);

  // Theme-based styling
  const isDark = theme === "dark";
  const backgroundStyle = isDark
    ? "linear-gradient(to right, #232526, #414345)" // Dark theme
    : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme

  return (
      <div>
          <LoadingAndErrorComponent loading={loading} error={error}/>

          {!loading && !error && (
              <div className="vh-100" style={{background: backgroundStyle, overflowX: 'hidden'}}>
                  {/* Navbar */}
                  <nav
                      className={`navbar navbar-expand-lg ${isDark ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                      <div className="container-fluid">
                          <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                          <span className="navbar-brand fw-bold">EduShare</span>
                          <button className="btn btn-outline-primary" onClick={() => navigate('/student-course-dashboard', { state: { courseId }})}>
                              ← Course
                          </button>
                      </div>
                  </nav>

                  <div className="row px-2">
                      {/* Video List */}
                      <div className="col-md-3 border-end py-2">
                          <ul className="list-group">
                              {videos.map((video) => (
                                  <li
                                      key={video.id}
                                      className={`list-group-item ${selectedVideo.id === video.id ? "active" : ""}`}
                                      onClick={() => setSelectedVideo(video)}
                                      style={{cursor: "pointer"}}
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
                                  src={selectedVideo.videoUrl}
                                  title={selectedVideo.title}
                                  allowFullScreen
                                  className="rounded shadow"
                              ></iframe>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>

  );
};

export default AllVideoLectures;

// const sampleVideos = [
//     { id: 1, title: "Introduction to React", url: "https://www.youtube.com/embed/Ke90Tje7VS0" },
//     { id: 2, title: "Node.js Basics", url: "https://www.youtube.com/embed/fBNz5xF-Kx4" },
//     { id: 3, title: "MongoDB Crash Course", url: "https://www.youtube.com/embed/ExcRbA7fy_A" },
//     { id: 4, title: "Express.js Tutorial", url: "https://www.youtube.com/embed/L72fhGm1tfE" },
// ];
