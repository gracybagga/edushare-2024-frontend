import React from 'react';
import CourseCard from '../../../GeneralComponents/js/CourseCard';

export default function Coursel() {

        // Array of course details
        const popularCourseDetails = [
            {
                title: 'English',
                description: 'Enhance your skills with chapters, covering grammar, literature, and writing skills.',
                image: 'https://media.istockphoto.com/id/511281043/photo/multiethnic-group-of-children-and-english-concept.jpg?s=612x612&w=0&k=20&c=BHz06Gw0Ef4C1UI8SpFzAiu3F50XZbQWlSveh0BEn1E=',
                link: '/courselist',
                courseDescription: 'Our English course is designed to enhance your language abilities across all levels. It covers foundational grammar, including parts of speech, sentence structure, and punctuation, moving into advanced topics like essay writing, literary analysis, and creative storytelling. Dive into a variety of literature, from classic novels and poetry to contemporary texts, helping you develop critical reading skills. The course also emphasizes vocabulary building, comprehension strategies, and effective communication skills, making it suitable for both academic improvement and everyday use.'
            },
            {
                title: 'Maths',
                description: 'Master math skills, from foundational arithmetic to complex problem-solving.',
                image: 'https://5.imimg.com/data5/HF/DC/GLADMIN-37672513/mental-maths-course-500x500.png',
                link: '/courselist',
                courseDescription: 'The Maths course provides a comprehensive journey through mathematical concepts, catering to learners from primary school to advanced high school levels. It begins with basic arithmetic and number theory, gradually introducing algebraic expressions, equations, and inequalities. Geometry chapters explore shapes, angles, and theorems, while higher-level topics include calculus, covering differentiation and integration. The course also features statistics and probability, focusing on data analysis, interpretation, and real-world applications. With step-by-step problem-solving techniques, this course aims to build a strong mathematical foundation and enhance logical reasoning.'
            },
            {
                title: 'Physics',
                description: 'Explore the physics world from basic concepts to advanced theories.',
                image: 'https://images.shiksha.com/mediadata/images/articles/1700206233phpqAgWZe.jpeg',
                link: '/courselist',
                courseDescription: 'Our Physics course delves into the fundamental principles that govern the natural world. Starting with classical mechanics, you’ll learn about motion, forces, energy, and momentum. The course progresses to cover waves, sound, and optics, explaining the nature of light and sound waves. Explore electricity and magnetism, understanding electric circuits, electromagnetic fields, and their real-world applications. Advanced topics include thermodynamics, exploring heat, work, and the laws of energy transfer, as well as an introduction to modern physics concepts like quantum mechanics and relativity, offering a deep insight into the physical universe.'
            },
            {
                title: 'Chemistry',
                description: 'Dive into elements and reactions with chapters tailored for every age.',
                image: 'https://www.chemicals.co.uk/wp-content/uploads/2021/09/molecules-and-formula-graphic-scaled.jpg',
                link: '/courselist',
                courseDescription: 'The Chemistry course offers a deep dive into the study of matter, its properties, and the changes it undergoes. Begin with an introduction to atomic structure, the periodic table, and chemical bonding. Explore various types of chemical reactions, stoichiometry, and thermochemistry. Learn about the principles of organic chemistry, including hydrocarbons, functional groups, and biochemical compounds. The course also covers topics in inorganic chemistry, such as acids, bases, salts, and complex ions. Additionally, it includes practical lab experiments and real-world applications to help students understand chemical processes in everyday life.'
            }
            ,
            {
                title: 'Biology',
                description: 'Uncover life, from cellular biology to ecosystems and human anatomy.',
                image: 'https://img.freepik.com/free-photo/side-view-young-girl-looking-into-microscope_23-2148778947.jpg?t=st=1731329620~exp=1731333220~hmac=9e8e9ff70e892a6b956a0be457aca7d839cd04f0640d4a6a5c0c5d4a9563112d&w=740',
                link: '/courselist',
                courseDescription: 'Our Biology course explores the diversity of life, starting at the cellular level with studies on cell structure, function, and division. Chapters on genetics introduce DNA, gene expression, and inheritance patterns. Learn about human anatomy and physiology, examining the bodys systems and their functions. The course covers plant biology, including photosynthesis and plant reproduction, as well as ecology, focusing on ecosystems, food chains, and biodiversity. It also introduces evolution and natural selection, helping learners understand the development of life on Earth and the interconnections between organisms.'
            },
            {
                title: 'Geography',
                description: 'Explore the landscapes and environments, from maps to global issues.',
                image: 'https://img.freepik.com/free-vector/three-students-study-geography-class_1308-531.jpg?t=st=1731329719~exp=1731333319~hmac=25a715478beb9ad8fe590073035a554d28e7ab2bbec4b2f4520c63653a7628ab&w=740',
                link: '/courselist',
                courseDescription: `The Geography course provides an in-depth look at the physical and human aspects of our planet. Begin with physical geography, studying Earths landforms, climates, and natural resources.<br/> Learn about weather patterns, climate zones, and the impact of natural phenomena like earthquakes and hurricanes. Human geography chapters explore population distribution, urbanization, and cultural landscapes, examining how human activities shape the environment. The course also discusses global issues such as sustainable development, environmental conservation, and climate change, helping learners appreciate the complexity of Earth systems and our role within them.`
            }
        ];

  return (
    <section className="courses bg-transparent py-5">
        <div className="container">
            <h2 className="text-center text-dark mb-2"><strong><i>POPULAR COURSES</i></strong></h2>
            <div className="row">
                {
                    popularCourseDetails.map(
                        (course, index) => (
                            <CourseCard 
                            key={index}
                            title={course.title}
                            description={course.description}
                            image={course.image}
                            link={course.link}
                            courseDescription={course.courseDescription}
                            />
                        )
                    )
                }
            </div>
        </div>
    </section>
  )
}

    // <section className="courses bg-trasnparent py-5">
    //     <div className="container">
    //         <h2 className="text-center mb-4"><strong><i>POPULAR COURSES</i></strong></h2>
    //         <div className="row">
    //                 <div className="col-md-4">
    //                     <div className="card">
    //                         <img src="course1.jpg" className="card-img-top" alt="Course 1"/>
    //                         <div className="card-body">
    //                             <h5 className="card-title">Web Development</h5>
    //                             <p className="card-text">Learn to build websites from scratch.</p>
    //                             <a href="/" className="btn btn-primary">Enroll Now</a>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="col-md-4">
    //                     <div className="card">
    //                         <img src="course2.jpg" className="card-img-top" alt="Course 2"/>
    //                         <div className="card-body">
    //                             <h5 className="card-title">Data Science</h5>
    //                             <p className="card-text">Master data analysis and visualization.</p>
    //                             <a href="/" className="btn btn-primary">Enroll Now</a>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="col-md-4">
    //                     <div className="card">
    //                         <img src="course3.jpg" className="card-img-top" alt="Course 3"/>
    //                         <div className="card-body">
    //                             <h5 className="card-title">Digital Marketing</h5>
    //                             <p className="card-text">Boost your business with digital marketing strategies.</p>
    //                             <a href="/" className="btn btn-primary">Enroll Now</a>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    // </section>