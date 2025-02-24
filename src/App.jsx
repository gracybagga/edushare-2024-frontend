// Previous team used react router for multipage navigation
import React from "react";
// import { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation, } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import "./App.css"; // not being used in 2024. Will be removing the import statement later

// Previous team components
// import KnowledgeBank from "./previousTeamWork/KnowledgeBankPage/js/kb";
// import AccountSetup from "./previousTeamWork/AccountSetup/js/AccountSetup";
// import Dashboard from "./previousTeamWork/Dashboard/js/Dashboard";
// import StudentProfile from "./previousTeamWork/viewUserProfile/js/studentProfile";
// import TeacherProfile from "./previousTeamWork/viewUserProfile/js/teacherProfile";
// import StudentSetupForm from "./previousTeamWork/AccountSetup/js/studentSetup";
// import axios from "axios";

// 2024 components
import HomePage from "./pages/js/homePage/HomePage";
import AboutPage from "./pages/js/aboutUsPage/AboutPage";
import JoinUs from "./pages/js/joinUsPage/JoinUs";
import Mission from "./pages/js/missionPage/Mission";
import CourseList from "./pages/js/couseList/CourseList";
import RegisterPage from "./pages/js/registerPage/RegisterPage";
import LoginPage from "./pages/js/loginPage/LoginPage";
import TeacherRegistration from "./TeacherRegistration/TeacherRegistration";
import StudentDashboard from "./pages/js/studentDashboard/StudentDashboard"
import TeacherDashboard from "./pages/js/teacherDashboard/TeacherDashboard";
import StudentCourseDashboard from "./pages/studentCourse/StudentCourseDashboard";

// This component is responsible for rendering the Navbar and Footer conditionally, as well as the routes
function MainApp() {
  // let location = useLocation();
  return (
    <div>
      <Routes>
        {/*Everyone*/}
        {/* Created in 2024 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/courselist" element={<CourseList/>} />
        <Route path="/become-teacher" element ={<TeacherRegistration/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = "/student-dashboard" element = {<StudentDashboard/>}/>
        <Route path = "/teacher-dashboard" element = {<TeacherDashboard/>}/>
        <Route path = "/student-course-dashboard" element = {<StudentCourseDashboard/>}/>

        {/*only user*/}
        {/* Created by previous team */}
        {/* <Route path="/kb" element={<KnowledgeBank />} />
        <Route path="/accountSetup" element={<AccountSetup />} />
        <Route path="/studentSetup" element={<StudentSetupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studentProfile" element={<StudentProfile />} />
        <Route path="/studentProfile/:username" element={<StudentProfile />}/>
        <Route path="/teacherProfile" element={<TeacherProfile />} />
        <Route path="/teacherProfile/:username" element={<TeacherProfile />}/> */}
      </Routes>
    </div>
  // commented code 1
  );
}

// AppWrapper is the top-level component that sets up the router
function App() {
  return (
    <div>
      <Router>
        <MainApp />
      </Router>
    </div>
    // commented code 2
  );
}

export default App;

// commented code 1
  //   <div className={`App ${location.pathname === "/register" ? "register-page" : ""}`}>
  //   {/* {location.pathname === "/" && <Navbar/>} */}
  //   <main className="main-content">
  //     <Routes>
  //       {/*Everyone*/}
  //       <Route path="/" element={<HomePage />} />
  //       <Route path="/about" element={<AboutPage />} />
  //       <Route path="/mission" element={<Mission />} />
  //       <Route path="/joinus" element={<JoinUs />} />
  //       <Route path="/courselist" element={<CourseList/>} />
  //       <Route path="/register" element={<RegisterPage />} />
  //       <Route path="/login" element={<LoginPage />} />

  //       {/* Dynamic course details page */}
  //       {/* Not setup yet */}
  //       {/* <Route path="/course/:id" element={<CourseDetail />} /> */}


  //       {/*only user*/}
  //       <Route path="/kb" element={<KnowledgeBank />} />
  //       <Route path="/accountSetup" element={<AccountSetup />} />
  //       <Route path="/studentSetup" element={<StudentSetupForm />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //       <Route path="/studentProfile" element={<StudentProfile />} />
  //       <Route path="/studentProfile/:username" element={<StudentProfile />}/>
  //       <Route path="/teacherProfile" element={<TeacherProfile />} />
  //       <Route path="/teacherProfile/:username" element={<TeacherProfile />}/>
  //     </Routes>
  //   </main>
  //   {/* {!["/register", "/login", "/accountSetup"].includes(location.pathname) && <Footer />} */}
  // </div>

    // commented code 2
    //   <div className="App">
    //   <Router>
    //     <MainApp />
    //   </Router>
    // </div>