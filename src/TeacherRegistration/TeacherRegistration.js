import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TeacherRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address.";

    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Invalid phone number.";

    if (!password.trim()) newErrors.password = "Password is required.";
    if (!confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    if (!subject.trim()) newErrors.subject = "Subject specialization is required.";
    if (!qualifications.trim()) newErrors.qualifications = "Educational qualifications are required.";
    if (!experience.trim()) newErrors.experience = "Job experience is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
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

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      subject,
      qualifications,
      experience,
    };

    try {
      const response = await fetch(`${process.env.EDUSHARE_BACKEND_URL}/apply/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      Swal.fire("Success", "Your application has been submitted successfully!", "success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setSubject("");
      setQualifications("");
      setExperience("");
    } catch (error) {
      Swal.fire("Error", "An error occurred while submitting your application. Please try again.", "error");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setSubject("");
      setQualifications("");
      setExperience("");
    }
  };

  const bgStylesLogin = {
    backgroundImage: 'url(https://img.freepik.com/free-photo/3d-render-graduation-cap-books-diploma_107791-15907.jpg?t=st=1737175337~exp=1737178937~hmac=a9a77db79e22fbbd5c888cac9667e3e26381aecd108e7c934004d166081aa540&w=1380)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return (
    <div style={bgStylesLogin}>
      <div className="container py-3 mt-2 mb-2 bg-transparent" style={{background:'rgba(180,180,180,0.2)'}}>
        <div className="row justify-content-center ">
          <div className="col-md-6">
            <div className="card shadow-lg "  style={{background:'rgba(180,180,180,0.2)', boxShadow:'0 10px 16px rgba(0,0,0,0.8)', border:'2px solid black', borderRadius:'10px'}}>
              <div className="card-header bg-dark text-white text-center">
                <h3>
                  <i className="bi bi-person-plus-fill me-2"></i>Teacher Registration
                </h3>
              </div>
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      <i className="bi bi-person-fill me-2"></i>First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <div style={{color:'red', fontSize:'small'}}>{errors.firstName}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      <i className="bi bi-person-fill me-2"></i>Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <div style={{color:'red', fontSize:'small'}}>{errors.lastName}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope-fill me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div style={{color:'red', fontSize:'small'}}>{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      <i className="bi bi-phone-fill me-2"></i>Phone Number
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <div style={{color:'red', fontSize:'small'}}>{errors.phone}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock-fill me-2"></i>Desired Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div style={{color:'red', fontSize:'small'}}>{errors.password}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="bi bi-lock-fill me-2"></i>Confirm desired Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Re-type desired password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <div style={{color:'red', fontSize:'small'}}>{errors.confirmPassword}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      <i className="bi bi-book-fill me-2"></i>Subject Specialization
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="E.g., Mathematics, Science"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    {errors.subject && <div style={{color:'red', fontSize:'small'}}>{errors.subject}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="qualifications" className="form-label">
                      <i className="bi bi-journal-bookmark-fill me-2"></i>Educational Qualifications
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="qualifications"
                      placeholder="E.g., B. Arts, B. Edu, B. Tech"
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                    />
                    {errors.qualifications && <div style={{color:'red', fontSize:'small'}}>{errors.qualifications}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="experience" className="form-label">
                      <i className="bi bi-briefcase-fill me-2"></i>Years of Job Experience
                    </label>
                    <select
                      className={`form-control`}
                      id="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>

                    </select>
                    {errors.experience && <div style={{color:'red', fontSize:'small'}}>{errors.experience}</div>}
                  </div>
                  <div className="mb-3">
                    <h6>Please note that our HR will review your application and contact you for further interview rounds, if you are shortlisted.</h6>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-check-circle-fill me-2"></i>Submit Application
                    </button>
                    <Link to="/" className="btn btn-secondary mt-2">
                      <i className="bi bi-house-fill me-2"></i>Back to Home
                    </Link>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center text-muted">
                Already have an account? <Link to="/login" className="text-primary">Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistration;
