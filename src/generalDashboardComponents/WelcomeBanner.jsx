import React from "react";

const WelcomeBanner = ({ userName }) => {
  return (
    <div className="alert alert-primary text-center">
      <h2>Welcome, {userName}!</h2>
    </div>
  );
};

export default WelcomeBanner;
