import React from 'react'
import "../../css/HomePage.css";

export default function FeacturesSection() {
  return (
    <section className="features py-5">
        <div className="container text-center">
            <div className="row text-center">
                <div className="col-md-4 py-2">
                <h3>World Class Instructors</h3>
                <p>Learn from directly from people who worked in the industry<br/>People who bring years of experience with them</p>
                </div>
                <div className="col-md-4 py-2 custom-middle-border">
                    <h3>AYOP Learning</h3>
                    <p>At Your Own Pace Learning<br/>Access courses on your schedule, at your pace.</p>
                </div>
                <div className="col-md-4 py-2">
                <h3>Certifications</h3>
                <p>Proudly show the earned badges on your socials<br/>Employers pay special attention to our platform badges</p>
                </div>
            </div>
        </div>
    </section>
  )
}
