import React from "react";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/TogglerCard.css"; // External CSS for custom styling
import { useNavigate } from "react-router-dom";

const TogglerCard = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!", "You have been successfully logged out.", "success");
        navigate('/login');
      }
    });
  };

  return (
    <div className={`card shadow-sm text-center rounded p-3 ${theme==='light'?'shadow-lg border-dark bg-light':'shadow-lg border-light bg-dark'}`} style={{height:'461px'}}>
      <div className={`card-header ${theme==='dark' ? 'text-light' : 'text-dark'}`} style={{fontSize:'2rem'}}>
        Settings
      </div>
      <div className="card-body d-flex justify-content-center align-items-center">
        <div className="d-flex align-items-center">
          <i
            className={`bi me-2 ${theme==='dark' ? "bi-moon-fill text-light" : "bi-sun-fill text-warning"}`} 
            style={{fontSize:'5rem'}}
          ></i>
          <span className={`ms-2 me-auto ${theme==='dark' ? 'text-light' : 'text-dark'}`} style={{fontSize:'2rem'}}>{theme==='dark' ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </div>
      <div className="card-body d-flex justify-content-center align-items-center mb-1">
        <div className="d-flex align-items-center">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="themeToggler"
              checked={theme==='dark'}
              onChange={toggleTheme}
              style={{scale:'3'}}
            />
          </div>
        </div>
      </div>   
      <div className="card-footer">
        <button className="btn btn-danger w-100 mt-4 mb-4 metallic-button" style={{minHeight:'60px'}} onClick={onLogout}>
          Logout
        </button>
      </div>   
    </div>
  );
};

export default TogglerCard;
