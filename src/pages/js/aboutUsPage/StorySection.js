import React from 'react'
// import aboutImage from "../img/whatIs.png";

export default function StorySection() {
  return (
    <section className="our-story py-5">
        <div className="container">
            <h2 className="text-center mb-4 display-4 text-dark">Our Story</h2>
            <div className="row">
                <div className="col-md-6" >
                    <h3>Empowering Lifelong Learners Since 2020</h3>
                    <p>Founded in 2020, our e-learning platform was born out of a simple yet powerful vision: to make quality education accessible to everyone, regardless of location, background, or schedule.</p>
                    <h5>Breaking Barriers to Education</h5>
                    <p>In a world where access to education can be limited by geography, financial constraints, or time, we set out to remove these barriers. Our platform is built with flexibility and innovation at its core, offering a wide range of courses that cater to diverse learning styles and needs.</p>

                    <h5>Courses for Every Journey</h5>
                    <p>Our expert instructors are industry leaders and passionate educators, dedicated to delivering engaging, practical, and up-to-date content that you can apply immediately in your personal and professional life.</p>
                    
                    <h5>A Community of Lifelong Learners</h5>
                    <p>Through interactive lessons, hands-on projects, and discussion forums, you will have the opportunity to engage with like-minded individuals from all over the world.</p>
                    
                    <h5>Your Success, Our Commitment</h5>
                    <p>We believe in the transformative power of education and are dedicated to helping you reach your goals, whether it is landing a new job, starting a business, or simply acquiring a new skill.</p>
                    
                    <h5>Join Us on the Journey of Lifelong Learning</h5>
                    <p>As we look to the future, our goal remains clear: to empower learners of all backgrounds to reach their full potential.</p>
                
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src='https://www.iitms.co.in/school-erp/img/School-E-Learning-Software-info.png' alt="Education through collaboration" className="img-fluid rounded" style={{borderRadius:'20px'}}/>
                </div>
            </div>
        </div>
  </section>
  )
}
