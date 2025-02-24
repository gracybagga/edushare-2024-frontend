import React from 'react';
// import { useEffect, useState } from 'react';


export default function JoinUsCommunitySection() {

    // Simulated data, later fetch it from server API
    const data = {
        learners: 1500,
        courses: 120,
        instructors: 35,
    };

  return (
    <section className="bg-transparent py-5 text-center">
        <div className="container">
            <h2 className="mb-4 text-dark">Join Our Growing Community</h2>
            <div className="row">
                <div className="col-md-4">
                    <h3 id="learnersCount" style={{color:'rgba(0, 30, 150, 0.8)'}}>{data.learners}</h3>
                    <p>Learners Enrolled</p>
                </div>
                <div className="col-md-4">
                    <h3 id="coursesCount" style={{color:'rgba(0, 30, 150, 0.8)'}}>{data.courses}</h3>
                    <p>Courses Available</p>
                </div>
                <div className="col-md-4">
                    <h3 id="instructorsCount" style={{color:'rgba(0, 30, 150, 0.8)'}}>{data.instructors}</h3>
                    <p>Instructors</p>
                </div>
            </div>
        </div>
    </section>
  )
}
