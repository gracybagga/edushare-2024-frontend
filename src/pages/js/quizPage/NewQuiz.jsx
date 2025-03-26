import React, { useState } from "react";
import scholarship from "../../img/scholarship.png";
import { useLocation, useNavigate } from "react-router-dom";

const NewQuiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
    const courseId = location.state?.courseId || "XYZ123"; // Extract courseId from location.state

    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");

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
        
        if (!quizTitle || !quizDescription) {
        alert("Please fill out all fields.");
        return;
        }

        // Upload logic here
        console.log("Uploading Quiz:", { courseId, quizTitle, quizDescription });

        // Reset form fields after submission
        setLectureTitle("");
        setLectureDescription("");
    };

    return (
        <div className="vh-100" style={{ background: backgroundStyle, overflowX: "hidden", overflowY: "hidden"  }}>
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg ${isDark ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                <div className="container-fluid">
                <img src={scholarship} alt="logo" style={{ maxHeight: "35px" }} />
                <span className="navbar-brand fw-bold">EduShare</span>
                <span style={{fontSize:'2rem'}}>🧩</span>
                </div>
            </nav>

            {/* Form to Upload Video */}
            <div className="d-flex flex-column align-items-center justify-content-center" style={{height:'90vh'}}>
                <div className={`card ${cardStyle} p-4 rounded-4`} style={{ width: "90%", maxWidth: "500px" }}>
                    <h3 className="text-center mb-3 fw-bold">🧩 Create New Quiz</h3>
                    <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Course ID</label>
                        <input type="text" className="form-control fw-bold" value={courseId} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Quiz Title</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Quiz title"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Detailed Quiz description and goals</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Quiz description"
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold mb-2" style={{ transition: "0.3s ease-in-out" }}>
                        🚀 Upload new Quiz
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

export default NewQuiz;
