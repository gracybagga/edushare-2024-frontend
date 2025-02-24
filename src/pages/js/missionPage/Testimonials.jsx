import React from 'react';
import TestimonialCard from '../../../GeneralComponents/js/TestimonialCard';

export default function Testimonials() {
    // Array of testimonial details
    const testimonials = [
        {
            text: "Great platform! I learned so much.",
            name: "John Doe"
        },
        {
            text: "Excellent courses and instructors.",
            name: "Jane Smith"
        },
        {
            text: "I got certified and landed a new job!",
            name: "Emily Johnson"
        },
        {
            text: "Great platform! I learned so much.",
            name: "John Doe"
        },
        {
            text: "Excellent courses and instructors.",
            name: "Jane Smith"
        },
        {
            text: "I got certified and landed a new job!",
            name: "Emily Johnson"
        }
    ];

  return (
    <div 
        id="testimonialsCarousel" 
        className="carousel slide py-5" 
        data-bs-ride="carousel"
    >
        <div className="carousel-inner">
            {
                testimonials.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className={`carousel-item ${index === 0 ? 'active' : ''} text-center`}
                        data-bs-interval="3000"
                    >
                        <TestimonialCard 
                            text={testimonial.text} 
                            name={testimonial.name} 
                        />
                    </div>
                ))
            }
            <button 
                className="carousel-control-prev" 
                type="button" 
                data-bs-target="#testimonialsCarousel" 
                data-bs-slide="prev"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button 
                className="carousel-control-next" 
                type="button" 
                data-bs-target="#testimonialsCarousel" 
                data-bs-slide="next"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>        
        </div>
        {/* Navigation Controls */}
        {/* <button 
            className="carousel-control-prev" 
            type="button" 
            data-bs-target="#testimonialsCarousel" 
            data-bs-slide="prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button 
            className="carousel-control-next" 
            type="button" 
            data-bs-target="#testimonialsCarousel" 
            data-bs-slide="next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button> */}
    </div>
  )
}

/**
 * return (
    <section className="testimonials py-5">
        <div className="container">
            <h2 className="text-dark text-center mb-4">What Our Students Say</h2>
            <div className="row text-center">
                {
                    testimonials.map(
                        (testimonial, index) => (
                            <TestimonialCard 
                                key={index} 
                                text={testimonial.text} 
                                name={testimonial.name} 
                            />
                        )
                    )
                }
            </div>
        </div>
    </section>
  )
 */