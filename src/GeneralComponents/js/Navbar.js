import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to handle navigation between pages

import "../css/Navbar.css"; // Import the CSS file for styling the Navbar
import scholarship from "../img/scholarship.png"; // Import the logo image that will be displayed in the Navbar


// The Navbar functional component
function Navbar() {
//  Logging to see when the Navbar component is rendered
  console.log("Navbar component rendered");
  return (
    <nav className="navbar navbar-expand-lg custom-navbar-dark custom-bg-dark">

      {/* div container that holds everything inside the navbar */}
      <div className="container-fluid">
        
        {/* Logo section with image and link */}
        <Link className="navbar-brand custom-navbar-brand" to="/">
          <img src={scholarship} alt="Logo" className="navbar-logo-img" />
          EduShare
        </Link>
        
        {/* Navbar toggler button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Collapsing navbar content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/mission" className="nav-link">Mission</Link>
            </li>
            <li className="nav-item">
              <Link to="/joinus" className="nav-link">Join Our Journey</Link>
            </li>
            <li className="nav-item">
              <Link to="/courselist" className="nav-link">List Of Courses</Link>
            </li>
          </ul>
          
          {/* Navbar actions (Login and Register buttons) */}
          <div className="navbar-actions">
            {/*<Link to="/login" className="btn btn-outline-dark me-2 mb-1">Login</Link>*/}
            {/*<Link to="/register" className="btn btn-outline-dark me-2 mb-1">Register as Student</Link>*/}
            {/*<Link to="/become-teacher" className="btn btn-outline-dark me-2 mb-1">Register as a Teacher</Link>*/}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// // The Navbar functional component
// function Navbar() {
//   // Logging to see when the Navbar component is rendered
//   console.log("Navbar component rendered");
//   return (
//     <nav className="navbar">
//       {/* Navbar container that holds everything inside the navbar */}

//       <div className="navbar-container">

//         {/* Logo section with the logo image and site name */}
//         <div className="logo-container">
//           {/* Image tag to display the logo */}
//           <img src={logoImage} alt="Logo" className="navbar-logo-img" />

//           {/* Link component from react-router-dom that navigates to the home page */}
//           <Link to="/" className="navbar-logo">EduShare</Link>
//         </div>

//         {/* Navigation links for different sections of the website */}
//         <div className="navbar-links">
//           {/* Each Link here navigates to a different page in your app */}
//           <Link to="/home">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/mission">Mission</Link>
//           <Link to="/journey">Join Our Journey</Link>
//         </div>

//         {/* Action buttons for login and registration */}
//         <div className="navbar-actions">

//           {/* Login button that links to the login page */}
//           <Link to="/login" className="navbar-btn">Login</Link>

//           {/* Register button that links to the registration page */}
//           <Link to="/register" className="navbar-btn navbar-btn-register">Register</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
