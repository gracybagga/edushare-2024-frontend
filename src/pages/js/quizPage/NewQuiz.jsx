import React, { useState } from "react";
import scholarship from "../../img/scholarship.png";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewQuiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
    const courseId = location.state?.courseId || ""; // Extract courseId from location.state
    const userRole = localStorage.getItem("userRole");
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [quizTitleError, setQuizTitleError] = useState("");
    const [quizDescriptionError, setQuizDescriptionError] = useState("");

    // Theme-based styling
    const isDark = theme === "dark";
    const backgroundStyle = isDark
        ? "linear-gradient(to right, #232526, #414345)" // Dark theme
        : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme
  
    const cardStyle = isDark
    ? "bg-dark text-light border border-secondary shadow-lg"
    : "bg-white text-dark border border-light shadow-lg";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setQuizTitleError("");
        setQuizDescriptionError("");

        if (userRole !== 'TEACHER') {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops...",
                text: "You are not authorized to post a new quiz!",
                showConfirmButton: false,
                timer: 1800
            });
            return;
        }
        if (!courseId) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops...",
                text: "CourseId is needed to submit a new quiz!",
                showConfirmButton: false,
                timer: 1800
            });
            return;
        }
        // Validation flags
        let isValid = true;
        if (!quizTitle) {
            setQuizTitleError("Quiz title is required.");
            isValid = false;
        }
        if (!quizDescription) {
            setQuizDescriptionError("Quiz description is required.");
            isValid = false;
        }

        const titleRegex = /^.{3,100}$/; // 3-100 characters
        const descriptionRegex = /^.{10,1000}$/; // minimum 10 characters

        if(!titleRegex.test(quizTitle.trim())) {
            setQuizTitleError('Quiz title must be 3-100 chars long.');
            isValid = false;
        }

        if (!descriptionRegex.test(quizDescription.trim())){
            setQuizDescriptionError("Quiz must be between 10 and 1000 characters.");
            isValid = false;
        }

        // If validation fails, stop execution
        if (!isValid) {
            console.log('validations failed')
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops...",
                text: "Form Validations failed!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        } else {
            try {
                setIsLoading(true);
                let token = localStorage.getItem('token');

                const url = `${process.env.VITE_EDUSHARE_BACKEND_URL}/api/quizzes/`;
                // prepare the payload and call backend
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        courseId: courseId,
                        title : quizTitle,
                        description: quizDescription
                    })
                });

                if (!response.ok) {
                    throw new Error('Lecture creation failed');
                }
                const result = await response.json(); // parse the response

                // reset the input fields
                setQuizTitle("");
                setQuizDescription("");

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'New Quiz has been successfully created',
                    showConfirmButton: true,
                    timer: 1800
                });
            } catch (error) {
                console.error('Error during Quiz creation:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Oops...",
                    text: "Error during Quiz creation. Please try again later!",
                    showConfirmButton: false,
                    timer: 1500
                });
            } finally {
                setIsLoading(false);
            }
        }
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
                            <div style={{color: 'red', fontSize: 'small'}}>{quizTitleError}</div>
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
                            <div style={{color: 'red', fontSize: 'small'}}>{quizDescriptionError}</div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold mb-2" style={{ transition: "0.3s ease-in-out" }}>
                            {isLoading ?
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Submitting...</span>
                                </div>
                                : "🚀 Upload new Quiz"}
                        </button>
                        <button className="btn btn-primary w-100 rounded-pill fw-bold mt-2" style={{ transition: "0.3s ease-in-out" }} onClick={() => navigate('/teacher-course-dashboard', {state: {courseId}})}>
                            ← Course Dashboard
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewQuiz;
