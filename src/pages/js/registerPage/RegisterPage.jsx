import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom to handle navigation between pages
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    province: '',
    country: 'Canada',
    zip: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: ''
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const zipRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&])(?=.*\d)[A-Za-z\d!@#$&]{6,14}$/;
    const today = new Date();
    const selectedDate = new Date(formData.dateOfBirth);

    if (!nameRegex.test(formData.firstName.trim())) newErrors.firstName = 'First Name must be 3-50 characters and can only contain letters';
    if (!nameRegex.test(formData.lastName.trim())) newErrors.lastName = 'Last Name must be 3-50 characters and can only contain letters';
    if (!emailRegex.test(formData.email.trim())) newErrors.email = 'Invalid email address';
    if (!phoneRegex.test(formData.phone.trim())) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!zipRegex.test(formData.zip.trim())) newErrors.zip = 'Invalid ZIP code format';
    if (!passwordRegex.test(formData.password.trim())) newErrors.password = 'Password must be 6-14 chars long, include at least 1 lowercase, 1 uppercase, 1 special char [!@#$&], and 1 digit';
    if (formData.password !== formData.confirmPassword.trim()) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (selectedDate > today) {
      newErrors.dateOfBirth = 'Date of birth cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the registration page
  };
    
  const handleRegisteration = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Form Validations Failed!",
        showConfirmButton: false,
        timer: 1500
      });
      return
    };
    console.log('Registering in...');
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      street: formData.street.trim(),
      province: formData.province.trim(),
      country: formData.country.trim(),
      zip: formData.zip.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
      gender: formData.gender.trim(),
      dateOfBirth: formData.dateOfBirth
    }
    try {
      const response = await fetch(`${process.env.EDUSHARE_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const result = await response.json();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        province: '',
        country: 'Canada',
        zip: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: ''
      }); // input fields reset

      Swal.fire({
        icon: "success",
        title: result.message,
        text: "Your user id is: "+result.userId,
      });

    } catch (error) {
      console.error('Error during Registration:', error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Error during Registration. Please try again later!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  // const bgStylesLogin = {
  //   background: 'linear-gradient(135deg,#e0bbe4, #b3d9ff)',
  //   minHeight: '100vh'
  // };

  const bgStylesLogin = {
    backgroundImage: 'url(https://img.freepik.com/free-photo/3d-render-graduation-cap-books-diploma_107791-15907.jpg?t=st=1737175337~exp=1737178937~hmac=a9a77db79e22fbbd5c888cac9667e3e26381aecd108e7c934004d166081aa540&w=1380)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return (
    <div className="container-fluid p-5 d-flex align-items-center justify-content-center" style={bgStylesLogin}>
      <div className="row w-75" style={{background:'rgba(180,180,180,0.2)', boxShadow:'0 10px 16px rgba(0,0,0,0.8)', border:'2px solid black', borderRadius:'10px'}}>
        {/* left col */}
        <div className="col-md-6 p-3 bg-transparent border-end d-flex flex-column justify-content-center align-items-center">
          <div className="text-center mb-2">
            <h4 className="mb-3">Have an account? Login!</h4>
            <button type="button" className="btn btn-outline-primary w-75 mb-3" onClick={handleLoginRedirect}>
            <i className="bi bi-box-arrow-in-left"></i> Go to Login
            </button>
          </div>
        </div>

        {/* right col */}
        <div className="col-md-6 p-3 bg-transparent">
          <div className="card-header"><h3 className="text-left font-weight-light my-1">Student Registeration</h3></div>
          <div className="card-body">
            <form onSubmit={handleRegisteration}>
              <div className="mb-2">
                <label htmlFor="firstName" className="form-label mb-2">First name:</label>
                <input type="text" className={`form-control`} id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" />
                <div className="invalid-feedback">{errors.firstName}</div>
              </div>
              <div className="mb-2">
              <label htmlFor="lastName" className="form-label mb-2">Last name:</label>
                <input type="text" className={`form-control`} id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Smith" />
                <div className="invalid-feedback">{errors.lastName}</div>
              </div>
              <div className="mb-2">
              <label htmlFor="email" className="form-label mb-1">Email address</label>
                <input type="email" className={`form-control`} id="email" value={formData.email} onChange={handleInputChange} placeholder="abc@email.com" />
                <div className="invalid-feedback">{errors.email}</div>
              </div>
              <div className="mb-2">
              <label htmlFor="phone" className="form-label mb-2">Phone Number:</label>
                <input type="text" className={`form-control`} id="phone" value={formData.phone} onChange={handleInputChange} placeholder="3063061234" />
                <div className="invalid-feedback">{errors.phone}</div>
              </div>
              <div className="mb-2">
                <label htmlFor="gender" className="form-label mb-2">Gender:</label>
                <select className={`form-control`} id="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="">Select Gender:</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="invalid-feedback">{errors.gender}</div>
              </div>
              <div className="mb-2">
                <label htmlFor="dateOfBirth" className="form-label mb-2">Date of Birth:</label>
                <input type="date" className={`form-control`} id="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} max={new Date().toISOString().split('T')[0]} />
                <div className="invalid-feedback">{errors.dateOfBirth}</div>
              </div>
              <div className="mb-2">
              <label htmlFor="street" className="form-label mb-2">Street:</label>
                <input type="text" className={`form-control`} id="street" value={formData.address} onChange={handleInputChange} placeholder="123 Main St" />
                <div className="invalid-feedback">{errors.address}</div>
              </div>
              <div className="mb-2">
              <label htmlFor="province" className="form-label">Province</label>
              <select className={`form-control`} id="province" value={formData.province} onChange={handleInputChange}>
                  <option value="">Select Province:</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PEI">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NWT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YK">Yukon</option>
                </select>
                <div className="invalid-feedback">{errors.province}</div>
              </div>
              <div className="mb-2">
                <label htmlFor="country" className="form-label mb-2">Country:</label>
                <input type="text" className="form-control" id="country" placeholder='Canada' readOnly/>
              </div>
              <div className="mb-2">
              <label htmlFor="zip" className="form-label mb-2">Zip Code:</label>
                <input type="text" className={`form-control`} id="zip" value={formData.zip} onChange={handleInputChange} placeholder="A1A 1A1" />
                <div className="invalid-feedback">{errors.zip}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6">
                <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className={`form-control`} id="password" value={formData.password} onChange={handleInputChange} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className={`form-control`} id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                </div>
              </div>
              <div className="row mb-1">
                <div className="col-md-6">
                <button type="submit" className="btn btn-outline-primary w-100 mt-2">Register</button>
                </div>
                <div className="col-md-6">
                  <Link to='/' className="btn btn-outline-dark w-100 mt-2">
                    <i className="bi bi-house-fill"></i>Home
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/RegisterPage.css";
// import { Navigate, useNavigate } from "react-router-dom";

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [rightPanelActive, setRightPanelActive] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     code: "",
//     addedBy: "", // Make sure this corresponds to a state property if you're using it.
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     document.body.classList.add("register-page");
//     return () => document.body.classList.remove("register-page");
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const apiUrl = process.env.REACT_APP_API_URL; // Use the environment variable for the API URL

//     if (!apiUrl) {
//       console.error("REACT_APP_API_URL environment variable is not set.");
//       alert("Registration failed! API URL is not set."); // Placeholder for error action
//       return;
//     }

//     try {
//       const response = await axios.post(
//         ${apiUrl}/api/teachers/register,
//         formData
//       );
//       console.log("Registration response:", response.data);

//       // Extract the _id from the response and store it along with the formData in local storage
//       const userData = { ...formData, _id: response.data._id };
//       console.log("Storing registration data with ID:", userData);
//       sessionStorage.setItem("registrationData", JSON.stringify(userData));

//       navigate("/accountSetup");
//     } catch (error) {
//       console.error(error.response.data);
//       setError(error.response.data.message);
//     }
//   };


//   const googleAuth = async () => {
//     try {
//       // Open the Google authentication URL in a new window
//       const authWindow = window.open(${process.env.REACT_APP_API_URL}/auth/google, "_blank");
  
//       // Check for authentication completion at regular intervals
//       const checkAuthStatus = setInterval(async () => {
//         try {
//           // Make a request to check if authentication is complete
//           const response = await axios.get(${process.env.REACT_APP_API_URL}/auth/success, { withCredentials: true });
//           const token = response.data.token;
  
//           // If the token is received, close the authentication window and clear the interval
//           if (token) {
//             clearInterval(checkAuthStatus);
//             authWindow.close(); // Close the authentication window
  
//             // Store the token or perform additional actions
//             localStorage.setItem('token', token);
//             sessionStorage.setItem('token', token);
//             console.log("Token obtained:", token);

//             // Redirect to the dashboard
//             navigate("/dashboard");
//           }
//         } catch (error) {
//           // Handle errors if needed
//           console.error("Error checking authentication status:", error.message);
//         }
//       }, 500); // Check every 2000 milliseconds (2 seconds), adjust as needed
//     } catch (error) {
//       console.error("Error opening Google authentication window:", error.message);
//     }
//   };
  

//   return (
//     <div
//       className={container ${rightPanelActive ? "right-panel-active" : ""}}
//       id="container"
//     >
//       <div className="form-container sign-up-container">
//         <div className="boxReg">
//         <form onSubmit={handleSubmit}>
//           <h1>Create Account</h1>
//           <input
//             name="firstName"
//             type="text"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleInputChange}
//           />
//           <input
//             name="lastName"
//             type="text"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleInputChange}
//           />
//           <input
//             name="username"
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleInputChange}
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <input
//             name="code"
//             type="text"
//             placeholder="Invitation Code"
//             value={formData.code}
//             onChange={handleInputChange}
//           />
//           <input
//             name="addedBy"
//             type="text"
//             placeholder="Added By"
//             value={formData.addedBy}
//             onChange={handleInputChange}
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//       </div>
//       <div className="form-container sign-in-container">
//         <div className="boxReg1">
//         <h1 className="register-heading">Create Account</h1>
//         <button onClick={() => googleAuth()} style={{ padding: '10px 20px', margin: '10px 0' }}>Sign Up with Google</button>
//         </div>
//       </div>
//       <div className="overlay-container">
//         <div className="overlay">
//           <div className="overlay-panel overlay-left">
//             <div className="contain">
//             <h1 className="register-heading1">Hello, Friend!</h1>
//             <p className="containP">Enter your personal details and start journey with us</p>
//             <button
//               className="ghost"
//               id="signIn"
//               onClick={() => setRightPanelActive(false)}
//             >
//               Are you a Student?
//             </button>
//             </div>
//           </div>
//           <div className="overlay-panel overlay-right">
//             <div className="contain">
//             <h1 className="register-heading">Hello, Friend!</h1>
//             <p>Embark on your journey with us by signing up!</p>
//             <button
//               className="ghost"
//               id="signUp"
//               onClick={() => setRightPanelActive(true)}
//             >
//               Are you a Teacher?
//             </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;