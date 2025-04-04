import React, { useState, useEffect } from "react";
import scholarship from "../../img/scholarship.png";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";

const TeacherAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state?.theme || "light"; // Default light background
  const assignmentIdArray = location.state?.assignmentIdArray || [];
  const courseId = location.state?.courseId || '';

  // Sample assignments data (simulating backend-rendered HTML content)
  const [assignments, setAssignments]  = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setError(null);

      if (!assignmentIdArray) {
        setLoading(false);
        setError("No assignment available.");
        return;
      }

      try {
        let currUserRole = localStorage.getItem('userRole');
        let token = localStorage.getItem('token');

        if (currUserRole !== 'STUDENT' && currUserRole !== 'TEACHER') {
          setError("You are not authorized to access these assignments.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/assignments/percourse/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }

        const result = await response.json();
        if (result.data.length === 0) {
          setError("No assignments available.");
        } else {
          setAssignments(result.data);
          setSelectedAssignment(result.data[0]);
          console.log(result.data)
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [courseId]);

  // // Intially setting up the current videos
  // useEffect(() => {
  //   console.log('initiated the smaller useEffect')
  //   console.log(assignments);
  //   if (assignments.length > 0) {
  //     setSelectedAssignment(assignments[0]);
  //   }
  // }, [assignments]);

  const isDark = theme === "dark";
  const backgroundStyle = isDark
    ? "linear-gradient(to right, #232526, #414345)" // Dark theme
    : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme

  return (
      <div>
        <LoadingAndErrorComponent loading={loading} error={error}/>

        {!loading && !error && (
            <div className="vh-100" style={{background: backgroundStyle, overflowX: 'hidden'}}>
              {/* Navbar */}
              <nav
                  className={`navbar navbar-expand-lg ${theme === "light" ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                <div className="container-fluid">
                  <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                  <span className="navbar-brand fw-bold">EduShare</span>
                  <button className="btn btn-primary rounded-pill" onClick={() => navigate('/teacher-course-dashboard', { state: { courseId }})}>
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
                            key={assignment._id}
                            className={`list-group-item ${selectedAssignment._id === assignment._id ? "active" : ""}`}
                            onClick={() => {
                              setSelectedAssignment(assignment);
                            }}
                            style={{cursor: "pointer"}}
                        >
                          {assignment.title}
                        </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Assignment Content */}
                <div className="col-md-8 p-2">
                  <div className=" ">
                    <div id="selectedFile" className={`${isDark ? "text-light" : " text-dark"}`}
                         dangerouslySetInnerHTML={{__html: selectedAssignment.content}}/>
                    <hr/>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>

  );
};

export default TeacherAssignment;

/*
* const assignments = [
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
* */
