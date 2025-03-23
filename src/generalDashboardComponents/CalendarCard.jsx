import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/CalendarCardDB.css";

const CalendarCard = ({theme}) => {
  return (
    <div className={`card shadow-sm text-center rounded calendar-container ${theme === "dark" ? "calendar-dark" : "calendar-light"}`}>
      <div className="card-body text-center">
        <h5 className={`card-title ${theme==='light'?'text-dark':'text-light'}`}>Calendar</h5>
        <div className="d-flex justify-content-center align-items-center">
          <Calendar value={new Date()} />
        </div>
      </div>
      <p className={`${theme==='light'?'text-dark':'text-light'}`}>
          <strong>Today's Date:</strong> {new Date().toDateString()}
        </p>
    </div>
  );
};

export default CalendarCard;
