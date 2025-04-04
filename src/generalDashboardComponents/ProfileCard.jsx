import React from "react";
import {Link, useNavigate} from 'react-router-dom';

const ProfileCard = ({ userName, theme, enrolledCourses }) => {
    let btnLink = localStorage.getItem('userRole') === 'TEACHER' ? '/teacher-profile' : '/student-profile';
    const navigate = useNavigate();
    const handleCourseClick = (courseId) => {
        navigate(btnLink, { state: { enrolledCourses, theme } });
    };
    console.log(theme)

    return (
    <div className={`card shadow-sm text-center rounded p-3 ${theme==='light'?'shadow-lg border-dark bg-light':'shadow-lg border-light bg-dark'}`} style={{minHeight:'412px'}}>
      <i className={`bi bi-person-circle ${theme==='light'?' text-dark':'text-light'}`} style={{ fontSize: "8rem" }}></i>
      <div className="card-body" style={{ minHeight: '140px',}}>
        <h5 className={`card-title ${theme==='light'?'text-dark':'text-light'} text-center mb-2`}  style={{ fontSize: "2rem" }}>{userName}</h5>
        <p className={`card-text ${theme==='light'?'text-muted':'text-secondary'} text-center mb-2 `}>Visit your Bio!</p>
        {/* Button to navigate to Profile */}
        <div className="d-flex justify-content-center mt-1 ">
          <div
            onClick = { handleCourseClick }
            className="btn btn-primary btn-lg rounded-pill px-4 py-2 mb-1 "
            style={{ fontSize: '1rem'}}
          >
            Go to Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
