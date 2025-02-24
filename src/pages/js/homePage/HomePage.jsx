import React from 'react';
import "../../css/HomePage.css";
import Carousel from '../../../GeneralComponents/js/Carousel';
import Navbar from '../../../GeneralComponents/js/Navbar';

import image1 from "../../img/homeCarousel1.jpg"
import image2 from "../../img/homeCarousel2.jpg"
import image3 from "../../img/homeCarousel3.jpg"
import image4 from "../../img/homeCarousel4.jpg"
import image5 from "../../img/homeCarousel5.jpg"
import HeroSection from './HeroSection';
import FeacturesSection from './FeaturesSection';
import Courses from './Courses';
import Footer from '../../../GeneralComponents/js/Footer';
import Newsletter from './Newsletter';

const images = [
    { src: image1, alt: "Carousel Slide 1" },
    { src: image2, alt: "Carousel Slide 2" },
    { src: image3, alt: "Carousel Slide 3" },
    { src: image4, alt: "Carousel Slide 4" },
    { src: image5, alt: "Carousel Slide 5" }
];

export default function HomePage() {
  return (
    <div className='custom-bg-container'>
        <Navbar/>
        <HeroSection/>
        <Carousel images={images}/>
        <FeacturesSection/>
        <Courses/>
        <Newsletter title="Newsletter" description="Subscribe to stay updated regarding announcements on new courses and promotions."/>
        <Footer/>

        {/* <div className="hero-container"> */}
            {/* <Carousel images={images}/> */}
            {/* <div className="hero-content"> */}
                {/* <div className="hero-text"> */}
                {/* <h1>Education through collaboration.</h1> */}
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipii voluptas ten mollitia pariatur odit, ab minus ratione adipisci accusamus vel est excepturi laboriosam magnam necessitatibus dignissimos molestias.</p> */}
                {/* <button className="start-now-btn">Start Now</button> */}
                {/* </div> */}
            {/* </div> */}
        {/* </div> */}
    </div>
  )
}

