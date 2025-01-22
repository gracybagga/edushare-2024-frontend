import React from 'react';
import "../css/Carousel.css";

export default function carousel({ images }) {
    return (
        <div className="container mb-3 mt-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div id="carouselExampleInterval" className="carousel slide " data-bs-ride="carousel">
                <div className="carousel-inner">
                    {
                        images.map((image, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="3000" >
                                    <img src={image.src} className="d-block w-100 custom-carousel-img" alt={image.alt || `carousel slide ${index + 1}`} />
                                </div>
                            )
                        )
                    }
                </div>
                <button 
                    className="carousel-control-prev" 
                    type="button" 
                    data-bs-target="#carouselExampleInterval" 
                    data-bs-slide="prev"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button 
                    className="carousel-control-next" 
                    type="button" 
                    data-bs-target="#carouselExampleInterval" 
                    data-bs-slide="next"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

// GB----------------------------------
// {/* <div className="carousel-item active" data-bs-interval="3000">
//                         <img src={carouselImage1} className="d-block w-100 custom-carousel-img" alt="crousel slide 1"/>
//                     </div>
//                     <div className="carousel-item" data-bs-interval="3000">
//                         <img src={carouselImage2} className="d-block w-100 custom-carousel-img" alt="crousel slide 2"/>
//                     </div>
//                     <div className="carousel-item" data-bs-interval="3000">
//                         <img src={carouselImage3} className="d-block w-100 custom-carousel-img" alt="crousel slide 3"/>
//                     </div>
//                     <div className="carousel-item" data-bs-interval="3000">
//                         <img src={carouselImage4} className="d-block w-100 custom-carousel-img" alt="crousel slide 4"/>
//                     </div>
//                     <div className="carousel-item" data-bs-interval="3000">
//                         <img src={carouselImage5} className="d-block w-100 custom-carousel-img" alt="crousel slide 5"/>
//                     </div> */}
// GB ----------------------------------


