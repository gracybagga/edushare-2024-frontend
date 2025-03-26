import React from "react";
import { Link } from "react-router-dom";

const PopularCourses = ({ theme }) => {
    let userRole = localStorage.getItem("userRole") || 'STUDENT';
    let btnText = userRole === 'TEACHER' ? 'Request' : 'Enroll';
    let btnLink = userRole === 'TEACHER' ? '/teacher-course-enrollment' : '/student-course-enrollment';
    const courses = [
        { id: 1, name: "Mathematics Essentials", image: "https://cdn.vectorstock.com/i/1000v/02/48/mathematics-school-subject-icon-education-vector-32720248.jpg" },
        { id: 2, name: "Introduction to Science", image: "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148497851.jpg?semt=ais_hybrid" },
        { id: 3, name: "Creative Writing", image: "https://media.istockphoto.com/id/1141968788/vector/concept-of-literary-art-with-letters-coming-out-of-a-pencil.jpg?s=612x612&w=0&k=20&c=30p9CxNFBNH-A7Xt-or1Nbz9RVfaqrLnRJFza9k16V4=" },
        { id: 4, name: "World History", image: "https://img.freepik.com/premium-vector/history-vector-round-colorful-linear-illustration_104589-1398.jpg" },
        { id: 5, name: "Basic Computer Skills", image: "https://thumbs.dreamstime.com/b/concept-thinking-background-brain-cpu-mind-series-technology-symbols-subject-computer-science-artificial-concept-117062986.jpg" },
        { id: 6, name: "Art & Creativity", image: "https://t4.ftcdn.net/jpg/02/90/76/83/360_F_290768326_SN1iziM2epjEjSGLDuKHAe7k5Mb37rWP.jpg" },
        { id: 7, name: "Physical Education", image: "https://media.istockphoto.com/id/2075354173/photo/fitness-couple-is-doing-kettlebell-twist-in-a-gym-togehter.jpg?s=612x612&w=0&k=20&c=lfs1V1d0YB33tn72myi6FElJnylPJYYM9lW5ZhlnYqY=" },
    ];

    const cardTheme = theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-light text-dark border-dark';

    return (
        <div className={`card ${cardTheme} shadow`}>
            <div className="card-body">
                <h5 className="card-title mb-4">Popular Courses</h5>
                <ul className="list-group">
                    {courses.map((course) => (
                        <li
                            key={course.id}
                            className={`px-1 list-group-item d-flex justify-content-between align-items-center ${theme==='dark'?'bg-dark text-light':'bg-light text-dark'}`}
                        >
                            <div className="d-flex align-items-center">
                                {/* Course Image */}
                                <img
                                    src={course.image}
                                    alt={course.name}
                                    className="rounded me-1"
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <div>
                                    {/* Course Name */}
                                    <h6 className="mb-1">{course.name}</h6>
                                </div>
                            </div>
                            {/* Enroll Now Button */}
                            <Link to={btnLink} state={{theme:theme}} >
                                <button className={`p-2 btn btn-${theme==='light'?'primary':'secondary'} btn-sm rounded-pill`}>{btnText}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PopularCourses;
