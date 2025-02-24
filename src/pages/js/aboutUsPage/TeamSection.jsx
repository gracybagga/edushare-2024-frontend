import React from 'react'
import "../../css/AboutUs.css";

export default function TeamSection() {
  return (
    <section className="team bg-light py-5">
        <div className="container text-center">
            <h2 className="mb-4 text-dark">Meet Our Team</h2>
            <div className="row">
                <div className="col-sm-4 mb-4">
                    <div className="card" >
                        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="custom-card-img-top" alt="Team Member"/>
                        <div className="card-body custom-card-info-height">
                            <h5 className="card-title">Alice Johnson</h5>
                            <p className="card-text">CEO & Co-Founder</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-4">
                    <div className="card" >
                        <img src="https://images.unsplash.com/photo-1542190891-2093d38760f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="custom-card-img-top" alt="Team Member"/>
                        <div className="card-body custom-card-info-height">
                            <h5 className="card-title">Bob Smith</h5>
                            <p className="card-text">CTO & Co-Founder</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-4">
                    <div className="card" >
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="custom-card-img-top" alt="Team Member"/>
                        <div className="card-body custom-card-info-height">
                            <h5 className="card-title">Sarah Lee</h5>
                            <p className="card-text">Lead Instructor</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </section>
  )
}
