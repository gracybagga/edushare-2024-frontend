import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom to handle navigation between pages
import Swal from 'sweetalert2';
import Edushare from "../../img/Edushare.jpg";

export default function ForgotPasswordPage() {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const theme = 'light';

    const handleLoginRedirect = () => {
        navigate("/login"); // Redirect to the registration page
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        console.log('Logging in...');
        setUsernameError("");
        setNewPasswordError("");
        setConfirmPasswordError("");


        const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&])(?=.*\d)[A-Za-z\d!@#$&]{6,14}$/;

        // Validation flags
        let isValid = true;

        // Validate username
        if (!username.trim()) {
            console.log('username not provided')
            setUsernameError("Email is required.");
            isValid = false;
        }

        // Validate password
        if (!newPassword.trim()) {
            console.log('password not provided')
            setNewPasswordError("Password is required.");
            isValid = false;
        }

        if (!newConfirmPassword.trim()) {
            console.log('password not provided')
            setConfirmPasswordError("Confirm Password is required.");
            isValid = false;
        }

        if(!usernameRegex.test(username.trim())) {
            console.log('Email did not pass regex')
            setUsernameError('Email is required.');
            isValid = false;
        }

        if (!passwordRegex.test(newPassword.trim())){
            console.log('New password did not pass the regex')
            setNewPasswordError("New Password must be 6-14 chars long, include at least 1 lowercase, 1 uppercase, 1 special char [!@#$&], and 1 digit");
            isValid = false;
        }

        if (!passwordRegex.test(newConfirmPassword.trim())){
            console.log('Confirm password did not pass the regex')
            setConfirmPasswordError("Confirm Password must be 6-14 chars long, include at least 1 lowercase, 1 uppercase, 1 special char [!@#$&], and 1 digit");
            isValid = false;
        }

        if (newPassword !== newConfirmPassword) {
            setConfirmPasswordError("Confirm Password must match new password");
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
                const url = `${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/auth/reset/password`;
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
                        newPassword:newPassword.trim(),
                        confirmPassword: newConfirmPassword.trim(),
                    })
                });

                // check if backedn sent a valid response
                if (!response.ok) {
                    throw new Error('Password Resetting failed');
                }
                const result = await response.json(); // parse the response

                // reset the input fields
                setUsername('');
                setNewPassword("");
                setNewConfirmPassword("");

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Password reset successfully! Please login now.",
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                console.error('Error during Registration:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Oops...",
                    text: "Error during Password resetting. Please try again later!",
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
        backgroundImage: `url(${Edushare})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={bgStylesLogin}>
            <div className="row w-50" style={{background:'rgba(180,180,180,0.9)', boxShadow:'0 10px 16px rgba(0,0,0,0.8)', border:'2px solid black', borderRadius:'10px'}}>
                {/* left col */}
                <div className="col-md-12 p-3 bg-transparent">
                    <div className="card-header">
                        <h3 className="text-center fw-bold fs-2 my-1">Reset your Password</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handlePasswordReset} noValidate>
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
                                <div style={{color: 'red', fontSize: 'small'}}>{usernameError}</div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="loginPassword" className="form-label fw-bold fs-4">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="loginPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                />
                                <div style={{color: 'red', fontSize: 'small'}}>{newPasswordError}</div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="loginPassword" className="form-label fw-bold fs-4">Confirm new
                                    Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="loginPassword"
                                    value={newConfirmPassword}
                                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                />
                                <div style={{color: 'red', fontSize: 'small'}}>{confirmPasswordError}</div>
                            </div>
                        </form>
                        <div className="row mb-1">
                            <div className="col-md-6">
                                <button className="btn btn-primary w-100 mt-2" onClick={handlePasswordReset}>
                                    {isLoading ?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Resetting...</span>
                                        </div>
                                        : "Reset Password"}
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-dark w-100 mt-2">
                                    <Link to='/login' className='text-light'>
                                        <i className="bi bi-box-arrow-in-left me-2"></i>Go to Login
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}