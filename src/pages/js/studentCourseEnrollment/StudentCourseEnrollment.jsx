import React, { useState } from "react";
import scholarship from "../../img/scholarship.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/StudentCourseEnrollment.css"; // Custom styles for animations

const StudentCourseEnrollment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
    const [courses, setCourses] = useState([
        { id: 1, title: "Mathematics Essentials", description: "Build a strong foundation in middle school math.", instructor: "Mr. Thompson", enrolled: false, image: "https://cdn.vectorstock.com/i/1000v/02/48/mathematics-school-subject-icon-education-vector-32720248.jpg" },
        { id: 2, title: "Introduction to Science", description: "Explore the wonders of physics, chemistry, and biology.", instructor: "Ms. Carter", enrolled: false, image: "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148497851.jpg?semt=ais_hybrid" },
        { id: 3, title: "Creative Writing", description: "Take your storytelling and writing skills to a new level.", instructor: "Mrs. Roberts", enrolled: false, image: "https://media.istockphoto.com/id/1141968788/vector/concept-of-literary-art-with-letters-coming-out-of-a-pencil.jpg?s=612x612&w=0&k=20&c=30p9CxNFBNH-A7Xt-or1Nbz9RVfaqrLnRJFza9k16V4=" },
        { id: 4, title: "World History", description: "Discover the past and learn about historical events.", instructor: "Mr. Stevens", enrolled: false, image: "https://img.freepik.com/premium-vector/history-vector-round-colorful-linear-illustration_104589-1398.jpg" },
        { id: 5, title: "Basic Computer Skills", description: "Learn essential computer and internet skills.", instructor: "Ms. Johnson", enrolled: false, image: "https://thumbs.dreamstime.com/b/concept-thinking-background-brain-cpu-mind-series-technology-symbols-subject-computer-science-artificial-concept-117062986.jpg" },
        { id: 6, title: "Art & Creativity", description: "Explore drawing, painting, and creative expression.", instructor: "Mrs. Taylor", enrolled: false, image: "https://t4.ftcdn.net/jpg/02/90/76/83/360_F_290768326_SN1iziM2epjEjSGLDuKHAe7k5Mb37rWP.jpg" },
        { id: 7, title: "Physical Education", description: "Stay active and learn about fitness and health.", instructor: "Coach Miller", enrolled: false, image: "https://media.istockphoto.com/id/2075354173/photo/fitness-couple-is-doing-kettlebell-twist-in-a-gym-togehter.jpg?s=612x612&w=0&k=20&c=lfs1V1d0YB33tn72myi6FElJnylPJYYM9lW5ZhlnYqY=" },
        { id: 8, title: "Music Fundamentals", description: "Introduction to musical notes, rhythm, and instruments.", instructor: "Mr. Anderson", enrolled: false, image: "https://cdn.vectorstock.com/i/500p/09/42/violin-and-notebook-as-school-education-item-vector-54550942.jpg" },
    ]);

    const handleEnroll = (id) => {
        setCourses(courses.map(course => 
            course.id === id ? { ...course, enrolled: !course.enrolled } : course
        ));
    };

    const isDark = theme==='dark';

    return (
        <div className={`${isDark ? "bg-dark" : "bg-light"}`} style={{minHeight:'100vh', overflowY:'auto'}}>
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg ${isDark ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                <div className="container-fluid">
                    <img src={scholarship} alt="logo" style={{ maxHeight: "35px" }} />
                    <span className="navbar-brand fw-bold">EduShare</span>
                    <span style={{fontSize:'2rem'}}>📚</span>
                </div>
            </nav>
            <div className={`container d-flex flex-column align-items-center py-5`}>
                <h2 className="fw-bold text-center mb-4">📚 Enroll in a Course</h2>
                <div className="course-grid">
                    {courses.map(course => (
                        <div key={course.id} className={`course-card p-4 rounded-4 shadow ${isDark ? "bg-secondary" : "bg-tertiary"}`}>
                            <img src={course.image} alt={course.title} className="course-image rounded mb-3" />
                            <h4 className="fw-bold">{course.title}</h4>
                            <p style={{minHeight:'80px'}}>{course.description}</p>
                            <small className="text-muted">Instructor: {course.instructor}</small>
                            <button 
                                className={`btn w-100 mt-3 fw-bold ${course.enrolled ? 'btn-success' : 'btn-primary'} rounded-pill`} 
                                onClick={() => handleEnroll(course.id)}
                            >
                                {course.enrolled ? "✔ Enrolled" : "🚀 Enroll Now"}
                            </button>
                        </div>
                    ))}
                </div>
                <button className="btn btn-dark rounded-pill mt-4 px-4 py-2 fw-bold" onClick={() => navigate(-1)}>← Back</button>
            </div>
        </div>
        
    );
};

export default StudentCourseEnrollment;
