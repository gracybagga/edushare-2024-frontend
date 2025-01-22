// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../css/LoginPage.css"; // Adjust this path to where your CSS file is located
// import createNotification from '../../notificationAPI';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom to handle navigation between pages
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleGoogleLogin = () => {
    window.location.href = '/auth/google'; // Redirect to Google login route
  };
    
  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to the registration page
  };

  const handleLogin = () => {
    navigate("/student-dashboard"); // TEMPORARY. ONE BELOW IS PERMANENT
  };
    
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log('Logging in...');
  //   setUsernameError("");
  //   setPasswordError("");

  //   const usernameRegex = /^.{3,}$/;
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&])(?=.*\d)[A-Za-z\d!@#$&]{6,14}$/;

  //   // Validation flags
  //   let isValid = true;

  //   // Validate username
  //   if (!username.trim()) {
  //     console.log('username not provided')
  //     setUsernameError("Username is required.");
  //     isValid = false;
  //   }

  //   // Validate password
  //   if (!password.trim()) {
  //     console.log('password not provided')
  //     setPasswordError("Password is required.");
  //     isValid = false;
  //   }

  //   if(!usernameRegex.test(username.trim())) {
  //     console.log('username did not pass regex')
  //     setUsernameError('Username is required.');
  //     isValid = false;
  //   }

  //   if (!passwordRegex.test(password.trim())){
  //     console.log('password did not pass the regex')
  //     setPasswordError("Password must be 6-14 chars long, include at least 1 lowercase, 1 uppercase, 1 special char [!@#$&], and 1 digit");
  //     isValid = false;
  //   }

  //   // If validation fails, stop execution
  //   if (!isValid) {
  //     console.log('validations failed')
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Form Validations failed!",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //     return;
  //   } else {
  //     try {
  //       console.log('starting fetch block')
  //       setIsLoading(true);
  //       const url = `${process.env.REACT_APP_EDUSHARE_BACKEND_URL}/auth/login`;
  //       console.log('url: '+url);
  //       // const url = `http://localhost:3100/auth/login`;
  //       // prepare the payload and call backend
  //       const response = await fetch(url, {
  //         method: 'POST',
  //         headers: { 
  //           "Content-Type": "application/json",
  //           "X-Requested-With": "XMLHttpRequest",
  //           "Accept": "application/json",
  //        },
  //         body: JSON.stringify({
  //           username: username.trim().toLowerCase(),
  //           password:password.trim()
  //         })
  //       });
  
  //       // setIsLoading(false);
  
  //       // check if backedn sent a valid response
  //       if (!response.ok) {
  //         throw new Error('Authentication failed');
  //       }
  //       const result = await response.json(); // parse the response
  
  //       // reset the input fields
  //       setUsername('');
  //       setPassword("");
  
  //       localStorage.setItem('token',result.token);
  //       localStorage.setItem('userId',result.user.id);
  //       localStorage.setItem('username',result.user.username);
  //       localStorage.setItem('userRole',result.user.role);
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: result.message,
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
        
  //       if(result.user.role==='STUDENT') {        
  //         navigate('/student-dashboard');
  //       }
    
  //     } catch (error) {
  //       setIsLoading(false);
  //       console.error('Error during Registration:', error);
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Error during Authentication. Please try again later!",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     }
  //   }
  // };

  // const bgStylesLogin = {
  //   background: 'linear-gradient(135deg, #b3d9ff, #e0bbe4)'
  // };
  const bgStylesLogin = {
    backgroundImage: 'url(https://img.freepik.com/free-photo/3d-render-graduation-cap-books-diploma_107791-15907.jpg?t=st=1737175337~exp=1737178937~hmac=a9a77db79e22fbbd5c888cac9667e3e26381aecd108e7c934004d166081aa540&w=1380)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={bgStylesLogin}>
      <div className="row w-75" style={{background:'rgba(180,180,180,0.7)', boxShadow:'0 10px 16px rgba(0,0,0,0.8)', border:'2px solid black', borderRadius:'10px'}}>
        {/* left col */}
        <div className="col-md-6 p-3 bg-transparent">
          <div className="card-header">
            <h3 className="text-left font-weight-light my-1">Login</h3>
            <h6>(Teachers must login with their credentials and not through google. Else, you will be accessing your student account.)</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin} noValidate>
              <div className="mb-2">
                <label htmlFor="loginUsername" className="form-label mb-3">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="loginUsername" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
                <div style={{color:'red', fontSize:'small'}}>{usernameError}</div>
              </div>
              <div className="mb-2">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="loginPassword" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <div style={{color:'red', fontSize:'small'}}>{PasswordError}</div>
              </div>
              <div className="mb-2 form-check" style={{textAlign:'left'}}>
                <input type="checkbox" className="form-check-input" id="loginCheckbox"/>
                <label className="form-check-label" htmlFor="loginCheckbox">Remember Me</label>
              </div>
              <div className="mb-2" style={{textAlign:'left'}}>
              <Link className="small" to="/password">Forgot Password?</Link>
              </div>
              <div className="row mb-1">
                <div className="col-md-6">
                  <button type="submit" className="btn btn-outline-primary w-100 mt-2">
                    {isLoading ? 
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Authenticating...</span>
                      </div> 
                    : "Login"}
                  </button>
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
        {/* right col */}
        <div className="col-md-6 p-3 bg-transparent border-start d-flex flex-column justify-content-center align-items-center">
          <div className="text-center mb-2">
            <h4 className="mb-3">Need an account? Sign up!</h4>
            <button type="button" className="btn btn-outline-primary w-75 mb-2" onClick={handleRegisterRedirect}>
              Go to Registration <i className="bi bi-box-arrow-in-right"></i>
            </button>
            <div className="text-muted mb-2">
              or Authenticate using Google
            </div>
            <button type="button" className="btn btn-outline-danger w-75 mb-2" onClick={handleGoogleLogin}>
              <i className="bi bi-google"></i><span> </span>Login with Google
            </button>            
          </div>
        </div>
      </div>
    </div>
  )
}


// const LoginPage = () => {
//   // State to manage the visibility of the right panel
//   const [rightPanelActive, setRightPanelActive] = useState(false);
//   // State to store user input for email and password
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // useNavigate hook to programmatically navigate to different routes
//   const navigate = useNavigate();

//   // useEffect to add a specific class to the body when component mounts and remove it when unmounts
//   useEffect(() => {
//     console.log("LoginPage component mounted");
//     document.body.classList.add("login-page");

//     return () => {
//       console.log("LoginPage component unmounted");
//       document.body.classList.remove("login-page");
//     };
//   }, []);

//   // Function to handle form submission for logging in
//   const handleSignIn = async (e) => {
//     e.preventDefault(); // Prevent the form from reloading the page
//     // const apiUrl = "http://localhost:3000";
//     const apiUrl = process.env.REACT_APP_API_URL;
//     console.log("API URL:", apiUrl); // This will log the API URL from your environment variable

//     if (!apiUrl) {
//       console.error("REACT_APP_API_URL environment variable is not set.");
//       alert("Login failed! API URL is not set."); // Placeholder for error action
//       return;
//     }

//     try {
//       // Attempt to log in with provided credentials
//       const response = await axios.post(
//         `${apiUrl}/api/login`, // Using the apiUrl variable here
//         {
//           email,
//           password,
//         }
//       );
//       console.log("Login response:", response.data);

//       // Store received token in session and local storage
//       sessionStorage.setItem("token", response.data.token);
//       localStorage.setItem("token", response.data.token);

//       // Redirect to the dashboard

//       //create notification that they have successfully signed up
//       await createNotification("Welcome to EduShare!", response.data.token);

//       // Redirect to dashboard on successful login
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Login failed!"); // Alert user if login fails
//     }
//   };

//   // Function for Google Authentication
//   const googleAuth = async () => {
//     try {
//         // Open the Google authentication URL in a new window
//         const authWindow = window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_blank");

//         // Function to check for authentication completion
//         const checkAuthStatus = async () => {
//             try {
//                 // Make a request to check if authentication is complete
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/success`, { withCredentials: true });
//                 const token = response.data.token;

//                 // If the token is received, close the authentication window and store the token
//                 if (token) {
//                     authWindow.close(); // Close the authentication window
//                     localStorage.setItem('token', token);
//                     sessionStorage.setItem('token', token);
//                     console.log("Token obtained:", token);
//                     // Redirect to the dashboard only if the original page is still open
//                     if (!window.closed) {

//                         //send notification
//                         await createNotification("Welcome to EduShare!", token);

//                         navigate("/dashboard"); // Redirect to the dashboard
//                     }
//                 }
//             } catch (error) {
//                 // Handle errors if needed
//                 console.error("Error checking authentication status:", error.message);
//             }
//         };

//         // Check for authentication completion at regular intervals
//         const intervalId = setInterval(checkAuthStatus, 500); // Check every 500 milliseconds (adjust as needed)

//         // Function to handle window closure
//         const handleWindowClosure = () => {
//             clearInterval(intervalId); // Stop checking for authentication status
//         };

//         // Event listener to handle window closure
//         window.addEventListener('unload', handleWindowClosure);
//     } catch (error) {
//         console.error("Error opening Google authentication window:", error.message);
//     }
// };

//   return (
//     <>
//       <div
//         className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
//         id="container"
//       >
//         {/* Form for user to sign in */}
//         <div className="form-container sign-up-container">
//         <div className="boxGoog">
//           <form onSubmit={handleSignIn}>
//             <h1>Sign In</h1>
//             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             {/* <a href="#">Forgot your password?</a> */}
//             <button type="submit">Sign In</button>
//           </form>
//         </div>
//         </div>
//         {/* Google Login Button */}
//         <div className="form-container sign-in-container">
//           <div className="boxGoog1">
//           <h1 className="login-heading">Create Account</h1>
//           <button onClick={()=>googleAuth()} style={{ padding: '10px 20px', margin: '10px 0' }} >Login With Google</button>
//           </div>
//         </div>
//         {/* Overlay container with two panels */}
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-panel overlay-left">
//               <div className="contain">
//               <h1>Welcome Back!</h1>
//               <p> To keep connected with us please login with your personal info </p>
//               <button className="ghost" id="signIn" onClick={() => setRightPanelActive(false)} > Sign In </button>
//             </div>
//             </div>
//             <div className="overlay-panel overlay-right">
//             <div className="contain">
//               <h1 className="login-heading">Hello, Friend!</h1>
//               <p>Embark on your journey with us by signing up!</p>
//               <button className="ghost" id="signUp" onClick={() => setRightPanelActive(true)}>
//                 Sign In
//               </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;
