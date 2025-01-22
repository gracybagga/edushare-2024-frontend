import React from 'react'

export default function ContactUsForm() {
  return (
    <section className="bg-transparent py-5">
        <div className="container">
            <h2 className="text-center mb-4 text-dark">Contact Us</h2>
            <form id="contact-form">
                <div className="mb-3">
                    <input type="text" className="form-control" id="contact-name" placeholder="Your Name" required/>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" id="contact-email" placeholder="Your Email" required/>
                </div>
                <div className="mb-3">
                    <textarea className="form-control" id="contact-message" rows="4" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
        </div>
    </section>
  )
}
