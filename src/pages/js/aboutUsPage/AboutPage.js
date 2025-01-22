import React from 'react';
// import aboutImage from "../img/whatIs.png";
import Navbar from '../../../GeneralComponents/js/Navbar';
import Footer from '../../../GeneralComponents/js/Footer';
import StorySection from './StorySection';
import TeamSection from './TeamSection';
import AboutHightlightSection from './AboutHightlightSection';

export default function AboutPage() {
  return (
    <>
      {/* <Navbar/>
      <div className="About">
        <div className="aboutImage">
          <img src={aboutImage} alt="Education through collaboration"/>
        </div>
        <div className="aboutContent">
          <h1>What is EduShare?</h1>
          <p>EduShare is reimagining education <br></br>through a unique platform that eases the process of creating, sharing,<br></br> and marking tests for teachers. With AI, we're bringing forward a dynamic<br></br> knowledge bank that's constantly evolving and curated not just by technology,<br></br> but by our global community of educators.</p>
        </div>
      </div>
      <Footer/> */}

      <Navbar/>
      <div className="container custom-bg-container">
        <AboutHightlightSection/>
        <StorySection/>
        <TeamSection/>
      </div>
      <Footer/>  
    </>
  )
}
