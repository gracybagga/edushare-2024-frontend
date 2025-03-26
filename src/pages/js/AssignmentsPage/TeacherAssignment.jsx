import React, { useState, useEffect } from "react";
import scholarship from "../../img/scholarship.png";
import { useLocation, useNavigate } from "react-router-dom";


const TeacherAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state?.theme || "light"; // Default light background

  // Sample assignments data (simulating backend-rendered HTML content)
  const assignments = [
    {
      id: 1,
      title: "Assignment 1: Introduction to HTML",
      content: `
        <h3>Introduction to HTML</h3>
        <p>In this assignment, you will create a simple webpage using HTML.</p>
        <ul>
          <li>Create a basic structure using <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags.</li>
          <li>Add a heading and a paragraph with some text.</li>
          <li>Include an image using the <code>&lt;img&gt;</code> tag.</li>
        </ul>
        <p><strong>Example:</strong></p>
        <pre>&lt;h1&gt;Welcome to HTML&lt;/h1&gt;</pre>
        <img src="https://via.placeholder.com/400" alt="Sample Image" class="img-fluid mt-2"/>
      `,
    },
    {
      id: 2,
      title: "Assignment 2: CSS Styling",
      content: `
        <h3>CSS Styling</h3>
        <p>Apply basic styles to your HTML page using CSS.</p>
        <ol>
          <li>Create an external CSS file.</li>
          <li>Style the heading to have a blue color.</li>
          <li>Add padding and margins to the paragraph.</li>
        </ol>
        <table class="table table-bordered mt-3">
          <thead>
            <tr>
              <th>CSS Property</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>color: blue;</td>
              <td>Changes text color to blue</td>
            </tr>
            <tr>
              <td>margin: 10px;</td>
              <td>Adds space around the element</td>
            </tr>
          </tbody>
        </table>
      `,
    },
    {
      id: 3,
      title: "Assignment 3: JavaScript Basics",
      content: `
        <h3>JavaScript Basics</h3>
        <p>Write a simple JavaScript function to display an alert when a button is clicked.</p>
        <p><strong>Example Code:</strong></p>
        <pre>
          function showAlert() {
            alert('Hello, JavaScript!');
          }
        </pre>
        <button class="btn btn-warning" onclick="alert('Hello, JavaScript!')">Click Me</button>
      `,
    },
  ];

  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const isDark = theme === "dark";
  const backgroundStyle = isDark
    ? "linear-gradient(to right, #232526, #414345)" // Dark theme
    : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme

  return (
    <div className="vh-100" style={{ background: backgroundStyle, overflowX:'hidden' }}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
        <div className="container-fluid">
          <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
          <span className="navbar-brand fw-bold">EduShare</span>
          <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
            ← Course
          </button>
        </div>
       </nav>
      <div className="row px-2">
        {/* Left Column: Assignments List */}
        <div className="col-md-4 py-2">
          <ul className="list-group">
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                className={`list-group-item ${selectedAssignment.id === assignment.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedAssignment(assignment);
                  setSelectedFile(null); // Reset file selection on assignment change
                }}
                style={{ cursor: "pointer" }}
              >
                {assignment.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Assignment Content */}
        <div className="col-md-8 p-2">
          <div className=" ">
            <div id="selectedFile" className={`${isDark ? "text-light" : " text-dark"}`} dangerouslySetInnerHTML={{ __html: selectedAssignment.content }} />
            <hr />

            {/* Upload Button */}
            <div className="mt-3">
              <input
                type="file"
                id="fileInput"
                className="d-none"
                onChange={handleFileChange}
              />

              {/* Display selected file name */}
              {selectedFile && (
                <p className="mt-2 text-success">Selected File: {selectedFile.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignment;
