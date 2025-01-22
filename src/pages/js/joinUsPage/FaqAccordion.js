import React from 'react'

export default function FaqAccordion() {
  return (
    <section className="container py-5">
        <h2 className="text-center mb-4 text-dark">Frequently Asked Questions</h2>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <strong>What types of courses do you offer?</strong>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        We offer a wide range of courses across various fields including technology, business, health, arts, and personal development. Our courses cater to all skill levels, from beginners to advanced learners.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <strong>How do I enroll in a course?</strong>
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        To enroll in a course, simply browse through our catalog, select the course you're interested in, and click on the "Enroll Now" button. You'll be prompted to create an account or log in to proceed with enrollment.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <strong>Are the courses self-paced?</strong>
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        Yes! Our courses are designed to be flexible and self-paced. You can learn at your own speed, whenever and wherever it’s convenient for you. There are no fixed schedules for most of our courses.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        <strong>Do I get a certificate after completing a course?</strong>
                    </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        Yes! Upon successfully completing a course, you will receive a certificate of completion, which you can download and share with your employers or on your LinkedIn profile.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        <strong>What if I need help during the course?</strong>
                    </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        Our platform provides multiple support options. You can reach out to our instructors via discussion forums, or contact our customer support team for any technical issues or inquiries. 
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
