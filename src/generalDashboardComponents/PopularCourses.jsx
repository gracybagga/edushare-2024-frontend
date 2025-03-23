import React from "react";
import { Link } from "react-router-dom";

const PopularCourses = ({ theme }) => {
    let userRole = localStorage.getItem("userRole") || 'STUDENT';
    let btnText = userRole === 'TEACHER' ? 'Request' : 'Enroll';
    const courses = [
        {
            id: 1,
            name: 'React for Beginners',
            image: 'https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F096baapsqqt9fks0us99.png',
        },
        {
            id: 2,
            name: 'Advanced JavaScript',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png',
        },
        {
            id: 3,
            name: 'Mastering TypeScript',
            image: 'https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png',
        },
        {
            id: 4,
            name: 'Learning C#',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6mDvl9odi-fcxjY7S1HItDwaizVfRbatVQ&s',
        },
        {
            id: 5,
            name: 'Data Structures and Algorithms',
            image: 'https://media.licdn.com/dms/image/v2/D4D12AQF_Wj1fEsaRsA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690875038253?e=2147483647&v=beta&t=u-5WytaSkz9aVIf1yo4F6nkMEdT0q7QOKpjTVY1nMGE',
        },
    ];

    const cardTheme = theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-light text-dark border-dark';

    return (
        <div className={`card ${cardTheme} shadow`}>
            <div className="card-body">
                <h5 className="card-title mb-4">Popular Courses</h5>
                <ul className="list-group">
                    {courses.map((course) => (
                        <li
                            key={course.id}
                            className={`px-1 list-group-item d-flex justify-content-between align-items-center ${theme==='dark'?'bg-dark text-light':'bg-light text-dark'}`}
                        >
                            <div className="d-flex align-items-center">
                                {/* Course Image */}
                                <img
                                    src={course.image}
                                    alt={course.name}
                                    className="rounded me-1"
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <div>
                                    {/* Course Name */}
                                    <h6 className="mb-1">{course.name}</h6>
                                </div>
                            </div>
                            {/* Enroll Now Button */}
                            <Link to='/student-enrollment' >
                                <button className={`p-2 btn btn-${theme==='light'?'primary':'secondary'} btn-sm rounded-pill`}>{btnText}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PopularCourses;
