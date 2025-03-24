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
    
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in...');
    setUsernameError("");
    setPasswordError("");
   

    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&])(?=.*\d)[A-Za-z\d!@#$&]{6,14}$/;

    // Validation flags
    let isValid = true;

    // Validate username
    if (!username.trim()) {
      console.log('username not provided')
      setUsernameError("Username is required.");
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      console.log('password not provided')
      setPasswordError("Password is required.");
      isValid = false;
    }

    if(!usernameRegex.test(username.trim())) {
      console.log('username did not pass regex')
      setUsernameError('Username is required.');
      isValid = false;
    }

    if (!passwordRegex.test(password.trim())){
      console.log('password did not pass the regex')
      setPasswordError("Password must be 6-14 chars long, include at least 1 lowercase, 1 uppercase, 1 special char [!@#$&], and 1 digit");
      isValid = false;
    }

    // If validation fails, stop execution
    if (!isValid) {
      console.log('validations failed')
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Form Validations failed!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else {
      try {
        console.log('starting fetch block')
        setIsLoading(true);
        const url = `${process.env.VITE_EDUSHARE_BACKEND_URL}/api/auth/login`;
        console.log('url: '+url);
        // const url = `http://localhost:3100/auth/login`;
        // prepare the payload and call backend
        const response = await fetch(url, {
          method: 'POST',
          headers: { 
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "application/json",
         },
          body: JSON.stringify({
            email: username.trim().toLowerCase(),
            password:password.trim()
          })
        });
  
        // setIsLoading(false);
  
        // check if backedn sent a valid response
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        const result = await response.json(); // parse the response
  
        // reset the input fields
        setUsername('');
        setPassword("");
  
        localStorage.setItem('token',result.token);
        localStorage.setItem('userId',result.user.id);
        localStorage.setItem('username',result.user.username);
        localStorage.setItem('userRole',result.user.role);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 1500
        });
        
        if(result.user.role==='STUDENT') {        
          navigate('/student-dashboard');
        }else {
          navigate('/teacher-dashboard');
        }
    
      } catch (error) {
        setIsLoading(false);
        console.error('Error during Registration:', error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: "Error during Authentication. Please try again later!",
          showConfirmButton: false,
          timer: 1500
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

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
                <label htmlFor="loginUsername" className="form-label mb-3">Email</label>
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
                  <button className="btn btn-outline-dark w-100 mt-2">
                    <Link to='/' className='text-dark'>
                      <i className="bi bi-house-fill"></i>Home
                    </Link>
                  </button>
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