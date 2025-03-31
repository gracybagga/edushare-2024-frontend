import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ClockCardCourse from "../../../generalDashboardComponents/ClockCardCourse";
import "../../css/teacherCourseDashboard.css";
import scholarship from "../../img/scholarship.png";
import Swal from "sweetalert2";
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";

const TeacherCourseDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = location.state?.theme || "light"; // Extract theme from location.state
    const courseId = location.state?.courseId || '';
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Course details state
    const [course, setCourse] = useState({});

    const navigateToDashboard = () => {
        navigate('/teacher-dashboard');
    }

    useEffect(() => {
        const fetchData = async () => {
            let currUserRole = localStorage.getItem('userRole');
            let currCourseId = courseId;
            let token = localStorage.getItem('token');
            try {
                if(currUserRole==='TEACHER') {
                    const response = await fetch(`${process.env.VITE_EDUSHARE_BACKEND_URL}/api/courses/${currCourseId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Accept": "application/json",
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Course details could not be fetched.');
                    }
                    const course = await response.json(); // parse the response
                    setCourse(course.data); // set student's coursesEnrolled
                    console.log(course);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, [courseId]); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div>
            <LoadingAndErrorComponent loading={loading} error={error}/>

            {!loading && !error && (
                <div
                    className={`course-dashboard ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"} min-vh-100`}>
                    {/* Navbar */}
                    <nav
                        className={`navbar navbar-expand-lg ${theme === "dark" ? "navbar-dark bg-black" : "navbar-light bg-white"} shadow-sm`}>
                        <div className="container-fluid">
                            <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                            <span className="navbar-brand fw-bold">EduShare</span>
                            <button className="btn btn-outline-primary" onClick={navigateToDashboard}>⬅ Back to
                                Dashboard
                            </button>
                        </div>
                    </nav>

                    <div className="mt-2 p-4">
                        <div className="row g-4">
                            <div className="col-md-8">
                                <div className="row g-4">
                                    {/* Course Header */}
                                    <motion.div
                                        className="text-center p-4 rounded shadow-sm"
                                        initial={{opacity: 0, y: -20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.5}}
                                    >
                                        <h2 className="fw-bold">{course.name}</h2>
                                        <p className="lead">{course.description}</p>
                                    </motion.div>

                                    {/* Course Features */}
                                    <div className="col-md-6">
                                        <motion.div
                                            className={`card shadow-sm border-0 h-100 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                            whileHover={{scale: 1.02}}>
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold">📚 Lecture Notes</h5>
                                                <p className="card-text">Read engaging lecture notes.</p>
                                                <p className="text-muted">Total 5 Lecture notes</p>
                                                <Link to='/teacher-course-lectures' state={{theme: theme}}>
                                                    <button className={`btn btn-primary rounded-pill w-100 mb-1`}>View
                                                        them
                                                    </button>
                                                </Link>
                                                <Link to='/teacher-course-lectures-new' state={{theme: theme}}>
                                                    <button
                                                        className={`btn btn-${theme === 'light' ? 'secondary' : 'light'} rounded-pill w-100 mb-1`}>Create
                                                        new
                                                    </button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className="col-md-6">
                                        <motion.div
                                            className={`card shadow-sm border-0 h-100 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                            whileHover={{scale: 1.02}}>
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold">🎥 Video Lectures</h5>
                                                <p className="card-text">Watch engaging lectures and tutorials.</p>
                                                <p className="text-muted">Total 5 videos</p>
                                                <Link to='/student-course-videos' state={{theme: theme}}>
                                                    <button className={`btn btn-success rounded-pill w-100 mb-1`}>Watch
                                                        Now
                                                    </button>
                                                </Link>
                                                <Link to='/teacher-course-videos-new' state={{theme: theme}}>
                                                    <button
                                                        className={`btn btn-${theme === 'light' ? 'secondary' : 'light'} rounded-pill w-100 mb-1`}>Create
                                                        new
                                                    </button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className="col-md-6">
                                        <motion.div
                                            className={`card shadow-sm border-0 h-100 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                            whileHover={{scale: 1.02}}>
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold">📝 Assignments</h5>
                                                <p className="card-text">Complete and submit your assignments.</p>
                                                <p className="text-muted">Total 4 Assignments</p>
                                                <Link to='/student-course-assignments' state={{theme: theme}}>
                                                    <button className={`btn btn-danger rounded-pill w-100 mb-1`}>View
                                                        Assignments
                                                    </button>
                                                </Link>
                                                <button
                                                    className={`btn btn-${theme === "light" ? "secondary" : "light"} rounded-pill w-100 mb-1`}
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "🚀 Future Feature!",
                                                            text: "This feature is coming soon. Stay tuned!",
                                                            icon: "info",
                                                            confirmButtonText: "Got it!",
                                                            background: theme === "dark" ? "#222" : "#fff",
                                                            color: theme === "dark" ? "#fff" : "#000",
                                                            confirmButtonColor: theme === "dark" ? "#007bff" : "#0d6efd",
                                                        });
                                                    }}
                                                >
                                                    Create new
                                                </button>
                                                {/* <Link to='/teacher-course-assignments-new' state = { {theme : theme} }>
                                            <button className={`btn btn-${theme==='light'?'secondary':'light'} rounded-pill w-100 mb-1`}>Create new</button>
                                        </Link> */}
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className="col-md-6">
                                        <motion.div
                                            className={`card shadow-sm border-0 h-100 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                            whileHover={{scale: 1.02}}>
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold">🧩 Quizzes</h5>
                                                <p className="card-text">Test your knowledge with quizzes.</p>
                                                <p className="text-muted">Total 5 Quizzes</p>
                                                <Link to='/student-course-quizzes' state={{theme: theme}}>
                                                    <button className={`btn btn-warning rounded-pill w-100 mb-1`}>Take a
                                                        Quiz
                                                    </button>
                                                </Link>
                                                <Link to='/teacher-course-quizzes-new' state={{theme: theme}}>
                                                    <button
                                                        className={`btn btn-${theme === 'light' ? 'secondary' : 'light'} rounded-pill w-100 mb-1`}>Create
                                                        new
                                                    </button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="row mt-2 g-4">
                                    <div className="col-md-8">
                                        {/* Upcoming Activities */}
                                        <motion.div
                                            className={`card shadow-sm border-0 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                            whileHover={{scale: 1.02}}
                                        >
                                            <div className="card-header"
                                                 style={{fontSize: '1.70rem', fontWeight: 'bold'}}>📅 Upcoming Activities
                                            </div>
                                            <div className="card-body" style={{overflowY: 'auto', maxHeight: '300px'}}>
                                                <ul className="list-group list-group-flush">
                                                    <li
                                                        className={`list-group-item ${theme === "dark" ? "bg-secondary text-white" : ""}`}>
                                                        Welcome to {course.name} 🎊 We're thrilled to have you join our teaching team! Your expertise and passion will make a real impact. 🏫✨
                                                    </li>
                                                    <li
                                                        className={`list-group-item ${theme === "dark" ? "bg-secondary text-white" : ""}`}>
                                                        ⏳ Your journey starts now! Begin by exploring the course structure and resources. Take it step by step—we're here to support you. 📚💡
                                                    </li>
                                                    <li
                                                        className={`list-group-item ${theme === "dark" ? "bg-secondary text-white" : ""}`}>
                                                        🧠 Inspire and challenge! Every lesson you teach helps shape eager minds. Stay curious, keep learning, and enjoy the journey! 🚀👏
                                                    </li>
                                                </ul>
                                                {/*<ul className="list-group list-group-flush">*/}
                                                {/*    {course.upcomingActivities.map((activity, index) => (*/}
                                                {/*        <li key={index}*/}
                                                {/*            className={`list-group-item ${theme === "dark" ? "bg-secondary text-white" : ""}`}>*/}
                                                {/*            {activity.icon} {activity.text}*/}
                                                {/*        </li>*/}
                                                {/*    ))}*/}
                                                {/*</ul>*/}
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* Discord button */}
                                        <motion.div
                                            className={`card shadow-sm border-0 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                            whileHover={{scale: 1.02}}>
                                            <div className="card-header"
                                                 style={{fontSize: '1.70rem', fontWeight: 'bold'}}>
                                                💬 Discord Group
                                            </div>
                                            <div className="card-body flex flex-col justify-between h-full"
                                                 style={{height: '242px'}}>
                                                <p className={`mt-3 text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                                                    Join discussions and ask questions. If something is on your mind,
                                                    chances
                                                    are it’s on someone else's too!
                                                </p>
                                                <div className="mt-5">
                                                    <p className={`text-base italic ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                                        Teamwork without a team is simply work. And who wants that?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button
                                                    className={`btn btn-info w-100 rounded-pill p-2`}
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "🚀 Future Feature!",
                                                            text: "This feature is coming soon. Stay tuned!",
                                                            icon: "info",
                                                            confirmButtonText: "Got it!",
                                                            background: theme === "dark" ? "#222" : "#fff",
                                                            color: theme === "dark" ? "#fff" : "#000",
                                                            confirmButtonColor: theme === "dark" ? "#007bff" : "#0d6efd",
                                                        });
                                                    }}
                                                >
                                                    Join the community!
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>


                            </div>

                            {/* Sidebar Widgets */}
                            <div className="col-md-4">
                                <motion.div
                                    className={`card shadow-sm border-0 ${theme === "dark" ? "bg-secondary" : "bg-white"}`}
                                    whileHover={{scale: 1.02}}>
                                    <ClockCardCourse/>
                                </motion.div>

                                {/* Calendar */}
                                <motion.div
                                    className={`card shadow-sm border-0 mt-4 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                    whileHover={{scale: 1.02}}>
                                    <div className="card-body text-center">
                                        <h5 className="card-title fw-bold">📆 Calendar</h5>
                                        <Calendar className="border rounded p-2"/>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCourseDashboard;

/*
* const [course] = useState({
        name: "React Fundamentals",
        description: "Master React by learning components, state, hooks, and real-world applications. Ready to make some apps of your own?",
        upcomingActivities: [
            { icon: "📌", text: "Assignment 1 Due" },
            { icon: "📅", text: "Live Session - React Hooks" },
            { icon: "❓", text: "Quiz on Components" },
            { icon: "📌", text: "Assignment 1 Due" },
            { icon: "📅", text: "Live Session - React Hooks" },
            { icon: "❓", text: "Quiz on Components" },
            { icon: "📌", text: "Assignment 1 Due" },
            { icon: "📅", text: "Live Session - React Hooks" },
            { icon: "❓", text: "Quiz on Components" },
            { icon: "📌", text: "Assignment 1 Due" },
            { icon: "📅", text: "Live Session - React Hooks" },
            { icon: "❓", text: "Quiz on Components" },
        ],
        progress: 75, // Example of progress percentage
        lecturesCompleted: 5,
        totalLectures: 10,
    });
* */