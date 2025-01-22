import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/CourseCard.css";

export default function CourseCard({ title, description, image, link, courseDescription }) {

  const offcanvasId = `offcanvas-${title.replace(/\s+/g, '-')}`; // Unique ID for each course

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/courselist"); // Navigate to the courselist page
  };

  return (
    <div className="col-md-4 my-1">
        <div className="card py-2 custom-bg">
           <img src={image} className="card-img-top custom-img-dimensions" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Click below for details</p>
                {/* <Link to={link} className="btn btn-primary">Details</Link> */}
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target={`#${offcanvasId}`}
                  aria-controls={offcanvasId}
                >
                  Details
                </button>

                {/* Offcanvas Component */}
                <div
                className="offcanvas offcanvas-start text-bg-dark"
                data-bs-scroll="true"
                id={offcanvasId}
                aria-labelledby={`${offcanvasId}-label`}
                tabIndex="-1"
                >
                  <div className="offcanvas-header">
                    <h4 className="offcanvas-title" id={`${offcanvasId}-label`}><strong>{title} Details</strong></h4>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <h5 className='mb-3 '>{description}<br/></h5>
                    <p style={{textAlign:"left"}}><br/>{courseDescription}</p>
                    <p><br/><br/>Learn more about this course by visiting the full details page.</p>
                    {/* React Router Link Component */}
                    <button className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={handleNavigate}>
                      Go to Course Lists
                    </button>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
