import React from 'react'

export default function Newsletter({title, description}) {
  return (
    <section className="newsletter bg-transparent text-dark text-center py-5">
        <div className="container">
            <h4>{title}</h4>
            <p>{description}</p>
            <form id="newsletterForm" className="d-flex justify-content-center">
                <input className="form-control form-control-lg" type="email" placeholder="Enter your email" aria-label=".form-control-lg example" required/>
                <div className="container">
                    <button type="submit" className="btn btn-dark ms-2" style={{maxWidth:'100px', margin:'5px auto'}}>Subscribe</button>
                </div>
            </form>
        </div>
    </section>
  )
}
// Subscribe to Our Newsletter
// Get the latest updates on new courses and promotions.