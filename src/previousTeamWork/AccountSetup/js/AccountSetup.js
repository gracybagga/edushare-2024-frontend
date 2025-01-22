import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import "../css/AccountSetup.css"; // Adjust this path to where your CSS file is located

function AccountSetup() {
  const [formData, setFormData] = useState({
    location: "",
    gender: "",
    gradeTaught: [], // If this is supposed to be a string, initialize as ""
    subjects: [], // If this is supposed to be a string, initialize as ""
    aboutMe: "",
    teachesAt: "",
    // Initialize all other fields that are used in the form
  });
  const [gradeLevelsOptions, setGradeLevelsOptions] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL; // Ensure you have this environment variable set
        // Fetch unique grade levels
        const gradeLevelsResponse = await axios.get(
          `${apiUrl}/api/unique-grade-levels`
        );
        const sortedGradeLevels = gradeLevelsResponse.data.sort(
          (a, b) => a - b
        );
        setGradeLevelsOptions(sortedGradeLevels);
      } catch (error) {
        console.error("Failed to fetch grade levels:", error);
      }
    };

    fetchOptions();

    // Load stored data from local storage
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const registrationData = JSON.parse(storedData);
      if (registrationData.accountSetup) {
        setFormData(registrationData.accountSetup);
      }
    }
  }, []);

  useEffect(() => {
    // Dynamically fetch subjects based on selected grade levels
    const fetchSubjects = async () => {
      if (formData.gradeTaught.length > 0) {
        try {
          const apiUrl = process.env.REACT_APP_API_URL; // Ensure you have this environment variable set
          const subjectsResponse = await axios.get(
            `${apiUrl}/api/subjects/by-grade`,
            {
              params: { gradeLevels: formData.gradeTaught.join(",") },
            }
          );
          setFilteredSubjects(subjectsResponse.data);
        } catch (error) {
          console.error(
            "Failed to fetch subjects for selected grade levels:",
            error
          );
        }
      } else {
        setFilteredSubjects([]);
      }
    };

    fetchSubjects();
  }, [formData.gradeTaught]);

  const handleInputChange = (e) => {
    const { name, options } = e.target;
    if (name === "gradeTaught" || name === "subjects") {
      let values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: values,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = JSON.parse(sessionStorage.getItem("registrationData"));
  
    if (!registrationData || !registrationData._id) {
      console.error("Registration data is missing or invalid.");
      console.log(sessionStorage.getItem("registrationData"));
      // Handle the absence of registration data gracefully
      return;
    }
  
    try {
      // Use environment variable for the API URL
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(
        `${apiUrl}/api/teachers/account-setup/${registrationData._id}`,
        { accountSetup: formData }
      );
      console.log("Server response:", response.data);
      alert("Account setup successfully updated!");
      //create notification that they have successfully signed up

      navigate("/login"); // Redirect to the dashboard after successful update
    } catch (error) {
      console.error("Error updating account setup:", error);
      alert("Failed to update account setup.");
    }
  };

  return (
    <>
      {/* <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div> */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Account Setup</h1>
          <input
            name="location"
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <input
            name="gender"
            type="text"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <select
            name="gradeTaught"
            onChange={handleInputChange}
            multiple
            value={formData.gradeTaught}
          >
            {gradeLevelsOptions.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          {/* Dropdown for subjects */}
          <select
            name="subjects"
            onChange={handleInputChange}
            multiple
            value={formData.subjects}
          >
            {filteredSubjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subject}
              </option>
            ))}
          </select>
          <input
            name="aboutMe"
            type="text"
            placeholder="About Me"
            value={formData.aboutMe}
            onChange={handleInputChange}
          />
          <input
            name="teachesAt"
            type="text"
            placeholder="School"
            value={formData.teachesAt}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <div className="contain">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signIn">
              Are you a Student?
            </button>
          </div>
          </div>
          <div className="overlay-panel overlay-right">
            <div className="contain">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSetup;
