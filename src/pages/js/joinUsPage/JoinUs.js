import React from 'react';
// import lottieJson from '../img/join.png';
import Navbar from '../../../GeneralComponents/js/Navbar';
import Footer from '../../../GeneralComponents/js/Footer';
import ContactUsForm from './ContactUsForm';
import FaqAccordion from './FaqAccordion';
import JoinUsHightlightSection from './JoinUsHightlightSection';
import JoinUsCommunitySection from './JoinUsCommunitySection';
import "../../css/JoinUs.css";

export default function JoinUs() {
  return (
    <div className='custom-bg-container'>
      <Navbar/>
      <JoinUsHightlightSection/>
      <JoinUsCommunitySection/>
      <FaqAccordion/>
      <ContactUsForm/>
      <Footer/>
    </div>
  )
}
