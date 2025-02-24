import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ClockCardCourse from "../../generalDashboardComponents/ClockCardCourse";
import "../css/studentCourseDashboard.css";
import scholarship from "../img/scholarship.png";

const StudentCourseDashboard = () => {
    const location = useLocation();
    const theme = location.state?.theme || "dark"; // Extract theme from location.state

    // Course details state
    const [course] = useState({
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

    const coursesFeatures = [
        { title: "📚 Lecture Notes", desc: "Read engaging lecture notes.", btn: "View them", color: "primary", additionalInfo: "Total 5 Lecture notes" },
        { title: "🎥 Video Lectures", desc: "Watch engaging lectures and tutorials.", btn: "Watch Now", color: "success", additionalInfo: "Total 5 videos" },
        { title: "📝 Assignments", desc: "Complete and submit your assignments.", btn: "View Assignments", color: "danger", additionalInfo: "Total 4 Assignments" },
        { title: "🧩 Quizzes", desc: "Test your knowledge with quizzes.", btn: "Take a Quiz", color: "warning", additionalInfo: "Total 5 Quizzes" },
    ];

    return (
        <div className={`course-dashboard ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"} min-vh-100`}>
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "navbar-dark bg-black" : "navbar-light bg-white"} shadow-sm`}>
                <div className="container-fluid">
                    <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                    <span className="navbar-brand fw-bold">EduShare</span>
                    <button className="btn btn-outline-primary">⬅ Back to Dashboard</button>
                </div>
            </nav>

            <div className="mt-2 p-4">
            <div className="row g-4">
                    <div className="col-md-8">
                        <div className="row g-4">
                            {/* Course Header */}
                            <motion.div
                                className="text-center p-4 rounded shadow-sm"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="fw-bold">{course.name}</h2>
                                <p className="lead">{course.description}</p>
                            </motion.div>

                            {/* Course Features */}
                            {coursesFeatures.map((currItem, index) => (
                                <div className="col-md-6" key={index}>
                                    <motion.div className={`card shadow-sm border-0 h-100 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`} whileHover={{ scale: 1.02 }}>
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{currItem.title}</h5>
                                            <p className="card-text">{currItem.desc}</p>
                                            {currItem.additionalInfo && <p className="text-muted">{currItem.additionalInfo}</p>}
                                            <button className={`btn btn-${currItem.color} rounded-pill w-100`}>{currItem.btn}</button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        <div className="row mt-2 g-4">
                            <div className="col-md-8">
                                {/* Upcoming Activities */}
                                <motion.div
                                    className={`card shadow-sm border-0 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                    whileHover={{scale: 1.02}}
                                >
                                    <div className="card-header" style={{fontSize:'1.70rem', fontWeight:'bold'}}>📅 Upcoming Activities</div>
                                    <div className="card-body" style={{ overflowY: 'auto', maxHeight: '300px' }}>
                                        <ul className="list-group list-group-flush">
                                            {course.upcomingActivities.map((activity, index) => (
                                                <li key={index}
                                                    className={`list-group-item ${theme === "dark" ? "bg-secondary text-white" : ""}`}>
                                                    {activity.icon} {activity.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="col-md-4">
                                {/* Discord button */}
                                <motion.div
                                    className={`card shadow-sm border-0 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}
                                    whileHover={{scale: 1.02}}>
                                    <div className="card-header" style={{fontSize: '1.70rem', fontWeight: 'bold'}}>
                                        💬 Discord Group
                                    </div>
                                    <div className="card-body flex flex-col justify-between h-full" style={{height: '242px'}}>
                                        <p className={`mt-3 text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                                            Join discussions and ask questions. If something is on your mind, chances
                                            are it’s on someone else's too!
                                        </p>
                                        <div className="mt-5">
                                            <p className={`text-base italic ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                                Teamwork without a team is simply work. And who wants that?
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className={`btn btn-info w-100 rounded-pill p-2`}>Join the community!</button>
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
                                <Calendar className="border rounded p-2" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCourseDashboard;