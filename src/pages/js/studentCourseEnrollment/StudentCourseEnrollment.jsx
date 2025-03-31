import React, {useEffect, useState} from "react";
import scholarship from "../../img/scholarship.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/StudentCourseEnrollment.css"; // Custom styles for animations
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";
import Swal from "sweetalert2";

const StudentCourseEnrollment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch courses from backend on mount
        const fetchCourses = async () => {
            try {

                const response = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/enroll/allcourses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Accept": "application/json",
                    }
                });
                if (!response.ok) {
                    throw new Error('Courses for enrollment could not be fetched.');
                }
                const data = await response.json();
                setCourses(data.data);
                console.log(courses)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        const studentId = localStorage.getItem("studentId");
        if (!studentId) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops...",
                text: "Student ID not found. Please try again later after logging in properly!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/enroll/student`, { // Replace with actual API
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ studentId, courseId }),
            });

            const result = await response.json();

            if (response.ok) {
                // setCourses(courses.map(course =>
                //     course._id === courseId ? { ...course, enrolled: true } : course
                // ));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 1800
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 1800
                });
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong. Try again later.",
                showConfirmButton: false,
                timer: 1800
            });
        }
    };

    const isDark = theme==='dark';

    return (
        <div>
            <LoadingAndErrorComponent loading={loading} error={error}/>

            {!loading && !error && (
                <div className={`${isDark ? "bg-dark" : "bg-light"}`} style={{minHeight: '100vh', overflowY: 'auto'}}>
                    {/* Navbar */}
                    <nav
                        className={`navbar navbar-expand-lg ${isDark ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                        <div className="container-fluid">
                            <img src={scholarship} alt="logo" style={{maxHeight: "35px"}}/>
                            <span className="navbar-brand fw-bold">EduShare</span>
                            <span style={{fontSize: '2rem'}}>📚</span>
                        </div>
                    </nav>
                    <div className={`container d-flex flex-column align-items-center py-5`}>
                        <h2 className={`fw-bold text-center mb-4 ${isDark ? "text-light" : "text-dark"}`}>📚 Enroll in a Course</h2>
                        <div className="course-grid">
                            {courses.map(course => (
                                <div key={course._id}
                                     className={`course-card p-4 rounded-4 shadow ${isDark ? "bg-secondary" : "bg-tertiary"}`}>
                                    <img src={course.image} alt={course.name} className="course-image rounded mb-3"/>
                                    <h4 className="fw-bold">{course.name}</h4>
                                    <button
                                        className={`btn w-100 mt-3 fw-bold btn-primary rounded-pill`}
                                        onClick={() => handleEnroll(course._id)}
                                    >
                                        🚀 Enroll Now
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-dark rounded-pill mt-4 px-4 py-2 fw-bold"
                                onClick={() => navigate('/student-dashboard')}>← Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCourseEnrollment;

/*
* const [courses, setCourses] = useState([
        { id: 1, title: "Mathematics Essentials", image: "https://cdn.vectorstock.com/i/1000v/02/48/mathematics-school-subject-icon-education-vector-32720248.jpg" },
        { id: 2, title: "Introduction to Science", image: "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148497851.jpg?semt=ais_hybrid" },
        { id: 3, title: "Creative Writing", image: "https://media.istockphoto.com/id/1141968788/vector/concept-of-literary-art-with-letters-coming-out-of-a-pencil.jpg?s=612x612&w=0&k=20&c=30p9CxNFBNH-A7Xt-or1Nbz9RVfaqrLnRJFza9k16V4=" },
        { id: 4, title: "World History", image: "https://img.freepik.com/premium-vector/history-vector-round-colorful-linear-illustration_104589-1398.jpg" },
    ]);
* */
