import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom to handle navigation between pages
import Swal from 'sweetalert2';
import Edushare from "../../img/Edushare.jpg";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = 'light';
  
  const handleGoogleLogin = () => {
    //window.location.href = '/auth/google'; // Redirect to Google login route
    Swal.fire({
      title: "🚀 Future Feature!",
      text: "This feature is coming soon. Stay tuned!",
      icon: "info",
      confirmButtonText: "Got it!",
      background: theme === "dark" ? "#222" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      confirmButtonColor: theme === "dark" ? "#007bff" : "#0d6efd",
  });
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
    
        // check if backedn sent a valid response
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        const result = await response.json(); // parse the response
  
        // reset the input fields
        setUsername('');
        setPassword("");
  
        localStorage.setItem('token',result.token);
        localStorage.setItem('userId',result.user.userId);
        localStorage.setItem('email',result.user.email);
        localStorage.setItem('userRole',result.user.role);
        localStorage.setItem('fullName',result.user.fullName);
        localStorage.setItem('firstName',result.user.firstName);
        localStorage.setItem('lastName',result.user.lastName);
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

  const handleFeatureAlert = () => {
    Swal.fire({
      icon: 'info',
      title: 'Coming Soon!',
      text: 'This feature is not yet available but will be added in the future.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Got it!',
    });
  };

  // const bgStylesLogin = {
  //   background: 'linear-gradient(135deg, #b3d9ff, #e0bbe4)'
  // };
  const bgStylesLogin = {
    backgroundImage: `url(${Edushare})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={bgStylesLogin}>
      <div className="row w-75" style={{background:'rgba(180,180,180,0.9)', boxShadow:'0 10px 16px rgba(0,0,0,0.8)', border:'2px solid black', borderRadius:'10px'}}>
        {/* left col */}
        <div className="col-md-6 p-3 bg-transparent">
          <div className="card-header">
            <h3 className="text-left fw-bold fs-2 my-1">Login</h3>
            <h6 className="fw-bold fs-6">(Teachers must login with their credentials and not through google. Else, you will be accessing your student account.)</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin} noValidate>
              <div className="mb-2">
                <label htmlFor="loginUsername" className="form-label fw-bold fs-4 mb-3">Email</label>
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
                <label htmlFor="loginPassword" className="form-label fw-bold fs-4">Password</label>
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
                <input type="checkbox" className="form-check-input" id="loginCheckbox" onClick={handleFeatureAlert}/>
                <label className="form-check-label" htmlFor="loginCheckbox">Remember Me</label>
              </div>
              <div className="mb-2" style={{textAlign:'left'}}>
                <Link className="small" to="#" onClick={handleFeatureAlert}>Forgot Password?</Link>
              </div>
              <div className="row mb-1">
                <div className="col-md-6">
                  <button type="submit" className="btn btn-primary w-100 mt-2">
                    {isLoading ? 
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Authenticating...</span>
                      </div> 
                    : "Login"}
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-dark w-100 mt-2">
                    <Link to='/' className='text-light'>
                      <i className="bi bi-house-fill me-2"></i>Home
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
            <h4 className=" fw-bold fs-3 mb-3">Need an account? Sign up!</h4>
            <button type="button" className="btn btn-primary w-75 mb-2 rounded-pill" onClick={handleRegisterRedirect}>
              Go to Registration <i className="bi bi-box-arrow-in-right"></i>
            </button>
            <div className="text-muted mb-2 fw-bold">
              or Authenticate using Google
            </div>
            <button type="button" className="btn btn-danger w-75 mb-2 rounded-pill" onClick={handleGoogleLogin}>
              <i className="bi bi-google"></i><span> </span>Login with Google
            </button>            
          </div>
        </div>
      </div>
    </div>
  )
}