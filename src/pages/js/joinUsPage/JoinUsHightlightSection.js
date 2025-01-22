import React from 'react';
import "../../css/JoinUs.css";

export default function JoinUsHightlightSection() {
    const courses = [
        { name: "English", icon: "bi bi-book-fill" },
        { name: "Maths", icon: "bi bi-book-fill" },
        { name: "Physics", icon: "bi bi-book-fill" },
        { name: "Chemistry", icon: "bi bi-book-fill" },
        { name: "Biology", icon: "bi bi-book-fill" },
        { name: "Geography", icon: "bi bi-book-fill" }
    ];

    function playVideo() {
        const video = document.getElementById('previewVideo');
        if (video.classList.contains('d-none')) {
            video.classList.remove('d-none');
            video.play();
        }
    }

  return (
    <section className="hightlight-section text-center text-dark p-5">
        <div className="container">
            <h1>Unlock Your Potential with Our E-Learning Platform</h1>
            <p>Join thousands of learners in gaining new skills and advancing your career.</p>
            <div className="row mt-4">
                <div className="col-md-6">
                    <button className="btn btn-outline-dark btn-lg" onClick={playVideo}>Watch Preview</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-outline-dark btn-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasJoinUs" aria-controls="offcanvasJoinUs" >
                        Explore Popular Courses
                    </button>

                    <div className="offcanvas offcanvas-end text-bg-dark" data-bs-scroll="true" tabindex="-1" id="offcanvasJoinUs" aria-labelledby="offcanvasJoinUsLabel">
                        <div className="offcanvas-header">
                            <h3 className="offcanvas-title" id="offcanvasJoinUsLabel">Popular Courses</h3>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body text-center">
                            {
                                courses.map(
                                    (course, index) => (
                                        <div className="row text-center mb-3" key={index}>
                                            <div className="col-md-6" style={{margin:'0 auto'}}>
                                                <div className="feature-box p-4">
                                                    <i className={course.icon}></i>
                                                    <h6>{course.name}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <video id="previewVideo" className="d-none" width="600" controls>
                    <source src="https://videos.pexels.com/video-files/3969453/3969453-uhd_2560_1440_25fps.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </section>
  )
}
