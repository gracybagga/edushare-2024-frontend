import React from "react";
import { useNavigate } from "react-router-dom";

const RecentlyEnrolledCourses = ({ courses, theme }) => {
    const navigate = useNavigate();

    const handleCourseClick = (courseId) => {
        if (localStorage.getItem('userRole')==='STUDENT') {
            navigate("/student-course-dashboard", { state: { courseId, theme } });
        }
        if (localStorage.getItem('userRole')==='TEACHER') {
            navigate("/teacher-course-dashboard", { state: { courseId, theme } });
        }
    };



    return (
        <div>
            <div
                className={`card shadow ${theme === 'dark' ? 'bg-dark text-light border-light' : 'bg-light text-dark border-dark'}`}
                style={{ height:'412px' , overflowY: "auto" }}
            >
                <div className="card-body">
                    <h3 className="card-title text-center">My Courses</h3>
                    {courses.length > 0 ? (
                        <ul className="list-group">
                            {courses.map((course) => (
                                <li
                                    key={course.id}
                                    className={`list-group-item d-flex align-items-center justify-content-between bg-transparent ${theme==='dark'? 'text-light' : 'text-dark' }`}
                                    onClick={() => handleCourseClick(course.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        style={{ width: "40px", height: "40px" }}
                                        className="ms-1 me-3"
                                    />
                                    <div className="flex-grow-1 d-flex flex-column">
                                        <strong>{course.name}</strong>
                                    </div>
                                    <div>
                                        <button className={`me-2 btn btn-${theme==='light'?'primary':'secondary'} btn-md rounded-pill`}>
                                            View
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={`${theme==='light'?'text-muted':'text-secondary'}`}>No courses in your account yet.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default RecentlyEnrolledCourses;
