import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import "./App.css"; // not being used in 2024. Will be removing the import statement later


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
import AllQuiz from "./pages/js/quizPage/AllQuiz";
import AllLecture from "./pages/js/lecturePage/AllLecture";
import AllVideoLectures from "./pages/js/VideoLecturePage/AllVideoLectures";
import StudentCourseDashboard from "./pages/js/studentCourse/StudentCourseDashboard";
import StudentAssignment from "./pages/js/AssignmentsPage/StudentAssignment";
import TeacherCourseDashboard from "./pages/js/teacherCourse/TeacherCourseDashboard";
import TeacherAssignment from "./pages/js/AssignmentsPage/TeacherAssignment";
import NewLecture from "./pages/js/lecturePage/NewLecture";
import NewVideoLectures from "./pages/js/VideoLecturePage/NewVideoLectures";
import NewQuiz from "./pages/js/quizPage/NewQuiz";
import StudentCourseEnrollment from "./pages/js/studentCourseEnrollment/StudentCourseEnrollment";

// This component is responsible for rendering the Navbar and Footer conditionally, as well as the routes
function MainApp() {
  return (
    <div>
      <Routes>
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
        <Route path = "/student-course-lectures" element = {<AllLecture/>}/>
        <Route path = "/student-course-videos" element = {<AllVideoLectures/>}/>
        <Route path = "/student-course-assignments" element = {<StudentAssignment/>}/>
        <Route path = "/student-course-quizzes" element = {<AllQuiz/>}/>
        <Route path = "/teacher-course-dashboard" element = {<TeacherCourseDashboard/>}/>
        <Route path = "/teacher-course-lectures" element = {<AllLecture/>}/>
        <Route path = "/teacher-course-videos" element = {<AllVideoLectures/>}/>
        <Route path = "/teacher-course-assignments" element = {<TeacherAssignment/>}/>
        <Route path = "/teacher-course-quizzes" element = {<AllQuiz/>}/>
        <Route path = "/teacher-course-lectures-new" element = {<NewLecture/>}/>
        <Route path = "/teacher-course-videos-new" element = {<NewVideoLectures/>}/>
        <Route path = "/teacher-course-quizzes-new" element = {<NewQuiz/>}/>
        <Route path = "/student-course-enrollment" element = {<StudentCourseEnrollment/>}/>

      </Routes>
    </div>
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
  );
}

export default App;
