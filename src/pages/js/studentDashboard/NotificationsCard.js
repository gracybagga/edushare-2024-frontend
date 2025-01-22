import React from "react";

const NotificationsCard = ({ theme }) => {
  const notifications = [
    { message: "You have a new message.", time: "2 min ago" },
    { message: "Your course starts tomorrow!", time: "1 day ago" },
    { message: "Payment processed successfully.", time: "3 days ago" },
    { message: "You have a new message.", time: "2 min ago" },
    { message: "Your course starts tomorrow!", time: "1 day ago" },
    { message: "Payment processed successfully.", time: "3 days ago" },
    { message: "You have a new message.", time: "2 min ago" },
    { message: "Your course starts tomorrow!", time: "1 day ago" },
    { message: "Payment processed successfully.", time: "3 days ago" },
  ];
  const cardTheme = theme === "dark" ? "bg-dark text-white border-light" : "bg-light text-dark border-dark";

  return (
    <>
      {/* Notifications Card */}
      <div className={`card ${cardTheme} shadow `}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between align-items-center">
            Notifications <i className="bi bi-bell-fill text-warning" style={{ fontSize: '2rem'}}></i>
          </h5>
          <div className="list-group overflow-auto" style={{ height: "323px" }}>
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <div key={index} className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="d-flex align-items-center">
                    <i className={`bi bi-bell me-2 text-primary`}></i>
                    <span className={`${theme==='light'?'text-dark':'text-light'}`}>{notif.message}</span>
                  </div>
                  <small className={`${theme==='light'?'text-muted':'text-secondary'}`}>{notif.time}</small>
                </div>
              ))
            ) : (
              <div className="text-center py-3">No new notifications</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsCard;
