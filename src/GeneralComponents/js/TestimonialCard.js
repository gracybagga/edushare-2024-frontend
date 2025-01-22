import React from 'react'

export default function TestimonialCard({ text, name }) {
  return (
    <blockquote className="blockquote">
        <p className="mb-4">"{text}"</p>
        <footer className="blockquote-footer"><h4>- {name}</h4></footer>
    </blockquote>
  )
}

/**
 *   return (
    <div className="col-md-4">
        <h5>"{text}"</h5>
        <h4>- {name}</h4>
    </div>
  )
 */