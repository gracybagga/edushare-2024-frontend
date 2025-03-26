import React, { useState } from "react";
import scholarship from "../../img/scholarship.png";
import { useLocation, useNavigate } from "react-router-dom";

const NewVideoLectures = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "dark"; // Extract theme from location.state
    const courseId = location.state?.courseId || "XYZ123"; // Extract courseId from location.state

    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");

    // Theme-based styling
    const isDark = theme === "dark";
    const backgroundStyle = isDark
        ? "linear-gradient(to right, #232526, #414345)" // Dark theme
        : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme
  
    const cardStyle = isDark
    ? "bg-dark text-light border border-secondary shadow-lg"
    : "bg-white text-dark border border-light shadow-lg";

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!videoTitle || !videoLink) {
        alert("Please fill out all fields.");
        return;
        }

        // Upload logic here
        console.log("Uploading Video:", { courseId, videoTitle, videoLink });

        // Reset form fields after submission
        setVideoTitle("");
        setVideoLink("");
    };

    return (
        <div className="vh-100" style={{ background: backgroundStyle, overflowX: "hidden", overflowY: "hidden"  }}>
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg ${isDark ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                <div className="container-fluid">
                <img src={scholarship} alt="logo" style={{ maxHeight: "35px" }} />
                <span className="navbar-brand fw-bold">EduShare</span>
                <span style={{fontSize:'2rem'}}>🎥</span>
                </div>
            </nav>

            {/* Form to Upload Video */}
            <div className="d-flex flex-column align-items-center justify-content-center" style={{height:'90vh'}}>
                <div className={`card ${cardStyle} p-4 rounded-4`} style={{ width: "90%", maxWidth: "500px" }}>
                    <h3 className="text-center mb-3 fw-bold">🎥 Upload Video Lecture</h3>
                    <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Course ID</label>
                        <input type="text" className="form-control fw-bold" value={courseId} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Video Title</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter video title"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">YouTube Video Link</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter YouTube video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold mb-2" style={{ transition: "0.3s ease-in-out" }}>
                        🚀 Upload Video
                    </button>
                    <button className="btn btn-primary w-100 rounded-pill fw-bold mt-2" style={{ transition: "0.3s ease-in-out" }} onClick={() => navigate(-1)}>
                        ← Course Dashboard
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewVideoLectures;
