import React from 'react';
import { Link } from 'react-router-dom';

export default function MissionCallToAction() {
  return (
    <section className="cta bg-transparent text-dark text-center py-3">
        <div className="container mt-2 py-2">
          <h2 className="mb-2 text-dark">Ready to start your learning journey?</h2>
          <Link to="/register" className="btn btn-success btn-lg">Join Us Now</Link>
        </div>
        <div className="container mt-2 py-2">
          <h2 className="mb-2 text-dark">Ready to help students with their learning journey?</h2>
          <Link to="/beomce-teacher" className="btn btn-success btn-lg">Become a Techer Now</Link>
        </div>
    </section>
  )
}
