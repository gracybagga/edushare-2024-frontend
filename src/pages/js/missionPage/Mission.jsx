import React from 'react';
import Navbar from '../../../GeneralComponents/js/Navbar';
import Testimonials from './Testimonials';
import Footer from '../../../GeneralComponents/js/Footer';
import MissionStatement from './MissionStatement';
import MissionCoreValues from './MissionCoreValues';
import MissionCallToAction from './MissionCallToAction';
import "../../css/Mission.css";

export default function Mission() {
  return (
    <div>
      <Navbar/>
      <div className=" custom-bg-container">
        <MissionStatement/>
        <Testimonials/>
        <MissionCoreValues/>
        <MissionCallToAction/>
      </div>
      <Footer/>  
    </div>
  )
}

      // <div className="Mission">
      //   <h1>What We Want?</h1>
      //   <div className="cards-container2">

      //     <div className="card-container2">

      //       <div className="card2">
      //         <div className="img-content2">
      //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-miterlimit="2" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd"><path fill-rule="nonzero" d="m2 19v-14c0-.552.447-1 1-1 .542 0 4.418 2.028 9 2.028 4.593 0 8.456-2.028 9-2.028.55 0 1 .447 1 1v14c0 .553-.45 1-1 1-.544 0-4.407-2.028-9-2.028-4.582 0-8.458 2.028-9 2.028-.553 0-1-.448-1-1zm1.5-.791 6.449-7.691c.289-.344.879-.338 1.16.012 0 0 1.954 2.434 1.954 2.434l1.704-1.283c.319-.24.816-.168 1.054.154l4.679 6.335v-12.44c-1.58.58-4.819 1.798-8.5 1.798-3.672 0-6.918-1.218-8.5-1.799zm2.657-.834c1.623-.471 3.657-.903 5.843-.903 2.309 0 4.444.479 6.105.98l-3.041-4.117-1.065.802.275.344c.259.323.206.796-.117 1.054-.323.259-.795.207-1.054-.117l-2.591-3.236zm.698-9.534c-1.051 0-1.905.854-1.905 1.905s.854 1.904 1.905 1.904 1.904-.853 1.904-1.904-.853-1.905-1.904-1.905zm0 1.3c.333 0 .604.271.604.605 0 .333-.271.604-.604.604-.334 0-.605-.271-.605-.604 0-.334.271-.605.605-.605z"></path></svg>
      //         </div>
      //         <div className="content2">
      //           <p className="heading2">Card Hover</p>
      //           <p>Lorem ipsum dolor sit amet, consectetur adipii voluptas ten mollitia pariatur odit, ab minus ratione adipisci accusamus vel est excepturi laboriosam magnam necessitatibus dignissimos molestias.</p>
      //         </div>
      //       </div>

      //     </div>

      //     <div className="card-container2">

      //       <div className="card2">
      //         <div className="img-content2">
      //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-miterlimit="2" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd"><path fill-rule="nonzero" d="m2 19v-14c0-.552.447-1 1-1 .542 0 4.418 2.028 9 2.028 4.593 0 8.456-2.028 9-2.028.55 0 1 .447 1 1v14c0 .553-.45 1-1 1-.544 0-4.407-2.028-9-2.028-4.582 0-8.458 2.028-9 2.028-.553 0-1-.448-1-1zm1.5-.791 6.449-7.691c.289-.344.879-.338 1.16.012 0 0 1.954 2.434 1.954 2.434l1.704-1.283c.319-.24.816-.168 1.054.154l4.679 6.335v-12.44c-1.58.58-4.819 1.798-8.5 1.798-3.672 0-6.918-1.218-8.5-1.799zm2.657-.834c1.623-.471 3.657-.903 5.843-.903 2.309 0 4.444.479 6.105.98l-3.041-4.117-1.065.802.275.344c.259.323.206.796-.117 1.054-.323.259-.795.207-1.054-.117l-2.591-3.236zm.698-9.534c-1.051 0-1.905.854-1.905 1.905s.854 1.904 1.905 1.904 1.904-.853 1.904-1.904-.853-1.905-1.904-1.905zm0 1.3c.333 0 .604.271.604.605 0 .333-.271.604-.604.604-.334 0-.605-.271-.605-.604 0-.334.271-.605.605-.605z"></path></svg>
      //         </div>
      //         <div className="content2">
      //           <p className="heading2">Card Hover</p>
      //           <p>Lorem ipsum dolor sit amet, consectetur adipii voluptas ten mollitia pariatur odit, ab minus ratione adipisci accusamus vel est excepturi laboriosam magnam necessitatibus dignissimos molestias.</p>
      //         </div>
      //       </div>

      //     </div>
      //     <div className="card-container2">

      //       <div className="card2">
      //         <div className="img-content2">
      //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-miterlimit="2" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd"><path fill-rule="nonzero" d="m2 19v-14c0-.552.447-1 1-1 .542 0 4.418 2.028 9 2.028 4.593 0 8.456-2.028 9-2.028.55 0 1 .447 1 1v14c0 .553-.45 1-1 1-.544 0-4.407-2.028-9-2.028-4.582 0-8.458 2.028-9 2.028-.553 0-1-.448-1-1zm1.5-.791 6.449-7.691c.289-.344.879-.338 1.16.012 0 0 1.954 2.434 1.954 2.434l1.704-1.283c.319-.24.816-.168 1.054.154l4.679 6.335v-12.44c-1.58.58-4.819 1.798-8.5 1.798-3.672 0-6.918-1.218-8.5-1.799zm2.657-.834c1.623-.471 3.657-.903 5.843-.903 2.309 0 4.444.479 6.105.98l-3.041-4.117-1.065.802.275.344c.259.323.206.796-.117 1.054-.323.259-.795.207-1.054-.117l-2.591-3.236zm.698-9.534c-1.051 0-1.905.854-1.905 1.905s.854 1.904 1.905 1.904 1.904-.853 1.904-1.904-.853-1.905-1.904-1.905zm0 1.3c.333 0 .604.271.604.605 0 .333-.271.604-.604.604-.334 0-.605-.271-.605-.604 0-.334.271-.605.605-.605z"></path></svg>
      //         </div>
      //         <div className="content2">
      //           <p className="heading2">Card Hover</p>
      //           <p>Lorem ipsum dolor sit amet, consectetur adipii voluptas ten mollitia pariatur odit, ab minus ratione adipisci accusamus vel est excepturi laboriosam magnam necessitatibus dignissimos molestias.</p>
      //         </div>
      //       </div>

      //     </div>
      //   </div>
      // </div>