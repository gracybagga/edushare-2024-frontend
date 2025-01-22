import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/StudentSetup.css";
// import "../css/AccountSetup.css"
import { useNavigate } from "react-router-dom";
const AccountSetupForm = () => {
  const [accountSetup, setAccountSetup] = useState({
    location: "",
    dateOfBirth: "",
    gender: "",
    gradeLevel: "",
    courses: [],
    aboutMe: "",
    subjects: [],
  });
  const [gradeLevelsOptions, setGradeLevelsOptions] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const apiURL = process.env.REACT_APP_API_URL + "/auth/success";
        const response = await axios.get(apiURL, { withCredentials: true });
        // Check if token and user exist in the response
        const { token, user } = response.data;
        if (token && user) {
          // Save the token to localStorage
          localStorage.setItem("token", token);
          // Set user information in state
          setUserInfo({
            username: user.username,
            email: user.email,
          });
    
          // Log the token to the console
          console.log("Token:", token);
        } else {
          console.error(
            "Token or user info not found in response:",
            response.data
          );
          // Handle the case where token or user data is missing or incomplete
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };    
    fetchUserInfo();
    const fetchGradeLevels = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL; // Ensure this variable is set
        const gradeLevelsResponse = await axios.get(
          `${apiUrl}/api/unique-grade-levels`
        );
        setGradeLevelsOptions(gradeLevelsResponse.data.sort((a, b) => a - b));
      } catch (error) {
        console.error("Failed to fetch grade levels:", error);
      }
    };
    fetchGradeLevels();
  }, []);


  useEffect(() => {
    // Dynamically fetch subjects based on selected grade levels
    const fetchSubjects = async () => {
      if (accountSetup.gradeLevel.length > 0) {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const subjectsResponse = await axios.get(
            `${apiUrl}/api/subjects/by-grade`,
            {
              params: { gradeLevels: accountSetup.gradeLevel.join(",") },
            }
          );
          setFilteredSubjects(subjectsResponse.data);
        } catch (error) {
          console.error("Failed to fetch subjects:", error);
        }
      } else {
        setFilteredSubjects([]);
      }
    };
    fetchSubjects();
  }, [accountSetup.gradeLevel]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, options, selectedOptions } = e.target;

    if (name === "username" || name === "email") {
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    } else if (name === "gradeLevel" || name === "courses") {
        let values = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);
        setAccountSetup((prevState) => ({
            ...prevState,
            [name]: values,
        }));
    } else if (name === "subjects") { // Correct the name to match your select's name attribute
        const selectedSubjects = Array.from(selectedOptions).map(option => option.value);
        setAccountSetup((prevState) => ({
            ...prevState,
            subjects: selectedSubjects,
        }));
    } else {
        setAccountSetup((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
};

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Ensure form is valid before proceeding
    try {
      // Log form data before making API call
      console.log("Form Data:", {
        username: userInfo.username,
        email: userInfo.email,
        accountSetup,
      });
  
      const apiURL = `${process.env.REACT_APP_API_URL}/students`;
      const response = await axios.post(
        apiURL,
        {
          username: userInfo.username,
          email: userInfo.email,
          accountSetup,
        },
        { withCredentials: true }
      ); // Make sure to include { withCredentials: true } if your API requires authentication
  
      // Log entire response data
      console.log("Response Data:", response.data);
  
      // Check if the API call was successful and the token is present in the response
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Delay closing the window for 2 seconds
        setTimeout(() => {
          // Close the current window
          window.close();
        }, 500); // 2000 milliseconds = 2 seconds
      } else {
        console.error("Token not found in response:", response.data);
        // Handle the case where the token is not present in the response
      }
    } catch (error) {
      console.error("Error during account setup:", error);
    }
  };
  
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    // Username validation
    if (!userInfo.username.trim()) {
      errors.username = "Username is required";
      formIsValid = false;
    }
    // Email validation
    if (!userInfo.email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Email is invalid";
      formIsValid = false;
    }
    // Location validation
    if (!accountSetup.location.trim()) {
      errors.location = "Location is required";
      formIsValid = false;
    }
    // Date of Birth validation
    if (!accountSetup.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
      formIsValid = false;
    }
    // Gender validation
    if (!accountSetup.gender.trim()) {
      errors.gender = "Gender is required";
      formIsValid = false;
    }
    // Grade Level validation
    // if (!accountSetup.gradeLevel.trim()) {
    //   errors.gradeLevel = "Grade Level is required";
    //   formIsValid = false;
    // } else if (accountSetup.gradeLevel < 9 || accountSetup.gradeLevel > 12) {
    //   errors.gradeLevel = "Grade Level must be between 9 and 12";
    //   formIsValid = false;
    // }
    // // Courses validation
    // if (!accountSetup.courses.trim()) {
    //   errors.courses = "Courses are required";
    //   formIsValid = false;
    // }
    // About Me validation
    if (!accountSetup.aboutMe.trim()) {
      errors.aboutMe = "About Yourself is required";
      formIsValid = false;
    }
    setErrors(errors);
    return formIsValid;
  };
  return (
    <form className="account-setup-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          placeholder="Username"
          className={`input-field ${errors.username && "is-invalid"}`}
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username}</div>
        )}
      </div>
      <input
        type="text"
        name="email"
        value={userInfo.email}
        onChange={handleChange}
        placeholder="Email"
        className={`input-field ${errors.username ? "is-invalid" : ""}`}
      />
      {errors.username && (
        <div className="invalid-feedback">{errors.username}</div>
      )}
      <div className="input-group">
        <input
          type="text"
          name="location"
          value={accountSetup.location}
          onChange={handleChange}
          placeholder="Location"
          className={`input-field ${errors.location ? "is-invalid" : ""}`}
        />
        {errors.location && (
          <div className="invalid-feedback">{errors.location}</div>
        )}
        <input
          type="date"
          name="dateOfBirth"
          value={accountSetup.dateOfBirth}
          onChange={handleChange}
          placeholder="Date of Birth"
          className={`input-field ${errors.dateOfBirth ? "is-invalid" : ""}`}
        />
        {errors.dateOfBirth && (
          <div className="invalid-feedback">{errors.dateOfBirth}</div>
        )}
      </div>
      <div className="input-group">
        <select
          name="gender"
          value={accountSetup.gender}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select
          name="gradeLevel"
          onChange={handleChange}
          value={accountSetup.gradeLevel}
        >
          {gradeLevelsOptions.map((grade, index) => (
            <option key={index} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        {/* Dropdown for subjects, similar to gradeLevel */}
        <select
    name="subjects" // This should match the string checked in the handleChange function
    onChange={handleChange}
    multiple
    value={accountSetup.subjects}
    className="input-field"
>
    {filteredSubjects.map((subject) => (
        <option key={subject._id} value={subject._id}>
            {subject.subject}
        </option>
    ))}
</select>
        <input
          type="text"
          name="aboutMe"
          value={accountSetup.aboutMe}
          onChange={handleChange}
          placeholder="About Yourself"
          className={`input-field ${errors.aboutMe ? "is-invalid" : ""}`}
        />
        {errors.aboutMe && (
          <div className="invalid-feedback">{errors.aboutMe}</div>
        )}
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};
export default AccountSetupForm;