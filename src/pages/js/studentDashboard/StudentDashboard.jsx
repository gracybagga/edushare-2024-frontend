import React, { useState, useEffect } from 'react';
import NavbarDB from '../../../generalDashboardComponents/NavbarDB';
import ChatbotDB from '../../../generalDashboardComponents/ChatbotDB';
import WelcomeBanner from "../../../generalDashboardComponents/WelcomeBanner";
import ProfileCard from "../../../generalDashboardComponents/ProfileCard";
import NotificationsCard from "../../../generalDashboardComponents/NotificationsCard";
import CalendarCard from "../../../generalDashboardComponents/CalendarCard";
import ClockCard from "../../../generalDashboardComponents/ClockCard";
import TogglerCard from "../../../generalDashboardComponents/TogglerCard";
import RecentlyEnrolledCourses from "../../../generalDashboardComponents/RecentlyEnrolledCourses";
import PopularCourses from "../../../generalDashboardComponents/PopularCourses";
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";

export default function StudentDashboard() {
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);
    const [theme, setTheme] = useState("light");
    const [userName, setUserName] = useState(localStorage.getItem("fullName"));
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleChatbot = () => {
        setIsChatbotVisible(!isChatbotVisible);
    };

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    useEffect(() => {
        const fetchData = async () => {
            // let currUsername = localStorage.getItem('username');
            let userRole = localStorage.getItem('userRole');
            let userId = localStorage.getItem('userId');
            let token = localStorage.getItem('token');

            try {
                if(userRole==='STUDENT') {
                    const studentResponse = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/student/dashboard/${userId}`, {
                        method: 'GET',
                            headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Accept": "application/json",
                        }
                    });

                    if (!studentResponse.ok) {
                        throw new Error('Student dashboard could not be fetched.');
                    }
                    const studentResult = await studentResponse.json(); // parse the response
                    localStorage.setItem('studentId',studentResult.studentId);
                    setEnrolledCourses(studentResult.coursesEnrolled); // set student's coursesEnrolled
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    return (
        <div>
            <LoadingAndErrorComponent loading={loading} error={error}/>

            {!loading && !error && (
                <div className={`min-vh-100 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>
                    <NavbarDB onToggleChatbot={toggleChatbot} theme={theme}/>
                    <WelcomeBanner userName={userName}/>
                    <div className="mx-2 my-4 ">
                        <div className="row mx-4 g-4">
                            {/* Profile Card */}
                            <div className="col-md-4">
                                <ProfileCard userName={userName} enrolledCourses={enrolledCourses} theme={theme}/>
                            </div>

                            {/* Notifications Card */}
                            <div className="col-md-4">
                                <NotificationsCard theme={theme}/>
                            </div>

                            {/* My Courses Card */}
                            <div className="col-md-4">
                                <RecentlyEnrolledCourses courses={enrolledCourses} theme={theme}/>
                            </div>

                            {/* Settings Card */}
                            <div className="col-md-4">
                                <TogglerCard
                                    theme={theme}
                                    toggleTheme={toggleTheme}
                                />
                            </div>

                            {/* Calendar Card */}
                            <div className="col-md-4">
                                <CalendarCard theme={theme}/>
                            </div>

                            {/* Clock Card */}
                            <div className="col-md-4">
                                <ClockCard/>
                            </div>

                            {/* Popular Courses Card */}
                            <div className="col-md-12 mb-5">
                                <PopularCourses theme={theme}/>
                            </div>
                        </div>
                    </div>
                    <ChatbotDB isVisible={isChatbotVisible} onClose={toggleChatbot} theme={theme}/>
                </div>
            )}
        </div>

    );
}

/*
*     const [enrolledCourses, setEnrolledCourses] = useState([
        { id:1, name: "React for Beginners", category: "Web Development", image: "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F096baapsqqt9fks0us99.png" },
        { id:2, name: "Advanced JavaScript", category: "Programming", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png" },
        { id:3, name: "Learning C#", category: "DSA", image: "https://media.licdn.com/dms/image/v2/D4D12AQF_Wj1fEsaRsA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690875038253?e=2147483647&v=beta&t=u-5WytaSkz9aVIf1yo4F6nkMEdT0q7QOKpjTVY1nMGE" },
        { id:4, name: "React", category: "Web Development", image: "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F096baapsqqt9fks0us99.png" },
        { id:5, name: "JavaScript", category: "Programming", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png" },
        { id:6, name: "C#", category: "DSA", image: "https://media.licdn.com/dms/image/v2/D4D12AQF_Wj1fEsaRsA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690875038253?e=2147483647&v=beta&t=u-5WytaSkz9aVIf1yo4F6nkMEdT0q7QOKpjTVY1nMGE" },
        { id:7, name: "React for Beginners", category: "Web Development", image: "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F096baapsqqt9fks0us99.png" },
        { id:8, name: "Advanced JavaScript", category: "Programming", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png" },
        { id:9, name: "Learning C#", category: "DSA", image: "https://media.licdn.com/dms/image/v2/D4D12AQF_Wj1fEsaRsA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690875038253?e=2147483647&v=beta&t=u-5WytaSkz9aVIf1yo4F6nkMEdT0q7QOKpjTVY1nMGE" },
    ]);
    * */