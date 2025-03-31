import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";
import scholarship from "../../img/scholarship.png"; // Ensure this CSS file replicates the <style> from the HTML

function TeacherProfile() {
    const fullName = localStorage.getItem('fullName');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();  // Hook to access location object
    const theme = location.state?.theme || 'light'; // Default to 'light' if no theme is set
    console.log(theme);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/teacher/profile/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Accept": "application/json",
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error("Teacher Profile could not be retrieved from the server!");
                }
                const data = await response.json();
                setProfileData(data.data);
            } catch (error) {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    // Theme-based classes
    const themeClasses = {
        light: {
            card: "card shadow-lg p-4 bg-white text-dark",
            button: "btn btn-primary rounded-pill",
            listItem: "list-group-item px-2",
        },
        dark: {
            card: "card shadow-lg p-4 bg-dark text-white",
            button: "btn btn-outline-light rounded-pill",
            listItem: "list-group-item bg-secondary text-white px-2",
        },
        blue: {
            card: "card shadow-lg p-4 bg-primary text-white",
            button: "btn btn-light text-primary rounded-pill",
            listItem: "list-group-item bg-light text-dark px-2",
        },
    };

    const currentTheme = themeClasses[theme] || themeClasses.light;

    return (
        <div style={{overflowX: 'hidden'}}>
            <LoadingAndErrorComponent loading={loading} error={error}/>

            {!loading && !error && (
                <div>
                    {/* Navbar */}
                    <nav className={`navbar navbar-expand-lg ${theme==='light' ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                        <div className="container-fluid">
                            <img src={scholarship} alt="logo" style={{maxHeight: "35px"}}/>
                            <span className="navbar-brand fw-bold">EduShare</span>
                            <span style={{fontSize: '2rem'}}>📚</span>
                        </div>
                    </nav>
                    <div className={`row justify-content-center ${theme==='dark' ? "bg-dark" : "bg-light"}`}>
                        <div className="col-md-8">
                            <div className={currentTheme.card}>
                                <div className="text-center">
                                    <img
                                        src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=360"
                                        alt="Profile"
                                        className="rounded-circle"
                                        width="120"
                                    />
                                    <h2 className="mt-3">{fullName}'s Profile</h2>
                                </div>

                                <div className="card-body">
                                    <h5 className="fw-bold">Basic Information</h5>
                                    <p><strong>First Name:</strong> {profileData.firstName}</p>
                                    <p><strong>Last Name:</strong> {profileData.lastName}</p>
                                    <p><strong>Email:</strong> {profileData.email}</p>
                                    <p><strong>Role:</strong> TEACHER</p>

                                    <h5 className="mt-3 fw-bold text-center">Other Details</h5>
                                    <ul className="list-group">
                                        <li className={currentTheme.listItem}><strong>Phone:</strong> {profileData.phone}</li>
                                        <li className={currentTheme.listItem}><strong>UserId:</strong> {profileData.userId}</li>
                                        <li className={currentTheme.listItem}><strong>Subjects Specialization:</strong> {profileData.subject}</li>
                                        <li className={currentTheme.listItem}><strong>Educational Qualifications:</strong> {profileData.qualifications}</li>
                                        <li className={currentTheme.listItem}><strong>Years of Job Experience:</strong> {profileData.experience}</li>
                                        <li className={currentTheme.listItem}><strong>Street:</strong> {profileData.street}</li>
                                        <li className={currentTheme.listItem}><strong>Province:</strong> {profileData.province}</li>
                                        <li className={currentTheme.listItem}><strong>Country:</strong> {profileData.country}</li>
                                        <li className={currentTheme.listItem}><strong>ZIP:</strong> {profileData.zip}</li>
                                    </ul>
                                </div>

                                <div className="text-center mt-4">
                                    <button
                                        className={currentTheme.button}
                                        onClick={() => navigate("/teacher-dashboard")}
                                    >
                                        Back to Dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default TeacherProfile;




