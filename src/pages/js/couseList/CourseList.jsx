import React, { useState, useMemo } from "react";
import Navbar from "../../../GeneralComponents/js/Navbar";
import Footer from "../../../GeneralComponents/js/Footer";

const courses = [
  {
    id: 1,
    name: "English",
    description:
      "Master English from basic grammar to advanced communication skills.",
    prerequisites: "No prior knowledge required.",
    learningOutcomes: [
      "Understand basic to advanced English grammar.",
      "Develop excellent writing and reading skills.",
      "Improve verbal communication and pronunciation.",
      "Prepare for advanced English proficiency tests."
    ],
    curriculum: [
      "Introduction to English Grammar",
      "Building Vocabulary",
      "Writing and Reading Skills",
      "Advanced Communication Techniques"
    ],
    instructor: "Alice Green",
    instructorBio: "Alice is a certified English language instructor with 10 years of experience.",
    courseDetails: "Ideal for learners at all levels."
  },
  {
    id: 2,
    name: "Mathematics",
    description:
      "Learn Mathematics from basic arithmetic to advanced calculus and statistics.",
    prerequisites: "Basic understanding of numbers.",
    learningOutcomes: [
      "Master arithmetic, algebra, and geometry.",
      "Understand advanced topics like calculus and statistics.",
      "Develop problem-solving and analytical skills.",
      "Apply mathematics in real-world scenarios."
    ],
    curriculum: [
      "Basic Arithmetic",
      "Algebra and Geometry",
      "Calculus",
      "Statistics and Probability"
    ],
    instructor: "Dr. Robert Taylor",
    instructorBio: "Dr. Taylor is a professor with a PhD in Mathematics and 15 years of teaching experience.",
    courseDetails: "Covers a broad spectrum of mathematical concepts."
  },
  // Add more subjects below
  {
    id: 3,
    name: "Chemistry",
    description:
      "Understand Chemistry from basic atomic structure to advanced organic reactions.",
    prerequisites: "Basic knowledge of high school science.",
    learningOutcomes: [
      "Learn the periodic table and chemical bonding.",
      "Understand chemical equations and reactions.",
      "Explore organic chemistry and biochemistry.",
      "Conduct safe and effective lab experiments."
    ],
    curriculum: [
      "Atomic Structure",
      "Periodic Table and Bonding",
      "Chemical Reactions",
      "Introduction to Organic Chemistry"
    ],
    instructor: "Dr. Emily Watson",
    instructorBio: "Dr. Watson is a researcher and professor specializing in Organic Chemistry.",
    courseDetails: "Designed for students looking to dive deeper into Chemistry."
  },
  {
    id: 4,
    name: "Biology",
    description: "Learn Biology from the basics of cell structure to advanced topics like genetics and ecology.",
    prerequisites: "Basic interest in life sciences.",
    learningOutcomes: [
      "Understand cell biology and molecular biology.",
      "Explore human anatomy and physiology.",
      "Learn genetics and heredity principles.",
      "Discover ecological systems and biodiversity."
    ],
    curriculum: [
      "Introduction to Biology",
      "Cell Structure and Function",
      "Human Anatomy and Physiology",
      "Genetics and Heredity",
      "Ecology and Biodiversity"
    ],
    instructor: "Dr. Sarah Miller",
    instructorBio: "Dr. Miller is a biologist with expertise in genetics and 12 years of teaching experience.",
    courseDetails: "Ideal for students keen to understand the living world in depth."
  },
  {
    id: 5,
    name: "Physics",
    description: "Master Physics concepts from basic mechanics to advanced quantum physics.",
    prerequisites: "Basic mathematics knowledge.",
    learningOutcomes: [
      "Understand fundamental laws of motion and energy.",
      "Explore concepts of thermodynamics and electromagnetism.",
      "Learn about modern physics topics like relativity and quantum mechanics.",
      "Apply physics to real-world problems."
    ],
    curriculum: [
      "Introduction to Physics",
      "Mechanics and Motion",
      "Thermodynamics",
      "Electromagnetism",
      "Modern Physics"
    ],
    instructor: "Prof. James White",
    instructorBio: "Prof. White is a physicist and researcher specializing in quantum mechanics.",
    courseDetails: "A comprehensive course for physics enthusiasts at all levels."
  },
  {
    id: 6,
    name: "Geography",
    description: "Discover Geography from physical landscapes to human-environment interactions.",
    prerequisites: "Interest in Earth sciences.",
    learningOutcomes: [
      "Understand Earth's physical features and processes.",
      "Learn about human geography and cultural landscapes.",
      "Analyze climate change and environmental issues.",
      "Explore the use of geographic tools like GIS."
    ],
    curriculum: [
      "Introduction to Geography",
      "Physical Geography",
      "Human Geography",
      "Climate and Environment",
      "GIS and Remote Sensing"
    ],
    instructor: "Dr. Laura Brown",
    instructorBio: "Dr. Brown is a geographer with expertise in environmental studies and GIS.",
    courseDetails: "Perfect for learners curious about Earth's features and human interactions."
  },
  {
    id: 7,
    name: "C#",
    description: "Learn C# programming from foundational syntax to advanced application development.",
    prerequisites: "Basic programming knowledge is recommended.",
    learningOutcomes: [
      "Master C# syntax and object-oriented programming principles.",
      "Learn about .NET framework and libraries.",
      "Develop desktop, web, and game applications using C#.",
      "Understand advanced concepts like LINQ and asynchronous programming."
    ],
    curriculum: [
      "Introduction to C#",
      "Object-Oriented Programming",
      "Working with .NET Framework",
      "Building Applications in C#",
      "Advanced C# Techniques"
    ],
    instructor: "John Carter",
    instructorBio: "John is a senior software engineer with a decade of experience in C# and .NET development.",
    courseDetails: "Best suited for developers aiming to master application development with C#."
  },
  {
    id: 8,
    name: "Java",
    description: "Learn Java programming from basic syntax to advanced enterprise development.",
    prerequisites: "Basic programming knowledge is helpful but not required.",
    learningOutcomes: [
      "Understand Java syntax and object-oriented programming.",
      "Work with Java libraries and frameworks.",
      "Build web and mobile applications using Java.",
      "Explore advanced topics like multithreading and design patterns."
    ],
    curriculum: [
      "Introduction to Java",
      "Object-Oriented Programming in Java",
      "Java Frameworks and Libraries",
      "Web and Mobile Development with Java",
      "Advanced Java Topics"
    ],
    instructor: "Jane Smith",
    instructorBio: "Jane is a seasoned Java developer and trainer with a passion for teaching.",
    courseDetails: "Great for learners aspiring to excel in Java development."
  },
  {
    id: 9,
    name: "JavaScript",
    description: "Master JavaScript from basic syntax to advanced features and frameworks.",
    prerequisites: "Basic understanding of HTML and CSS is recommended.",
    learningOutcomes: [
      "Understand JavaScript fundamentals and modern ES6+ syntax.",
      "Learn how to manipulate the DOM and handle events.",
      "Work with JavaScript frameworks like React and Vue.",
      "Explore asynchronous programming and REST API integration."
    ],
    curriculum: [
      "Introduction to JavaScript",
      "JavaScript and the DOM",
      "Advanced JavaScript Features",
      "Asynchronous JavaScript",
      "JavaScript Frameworks"
    ],
    instructor: "Emily Turner",
    instructorBio: "Emily is a senior front-end developer specializing in modern JavaScript and web applications.",
    courseDetails: "Ideal for web developers looking to build dynamic, interactive applications."
  },
  {
    id: 10,
    name: "Database Management",
    description: "Learn how to design, implement, and manage databases efficiently.",
    prerequisites: "Basic computer skills are sufficient.",
    learningOutcomes: [
      "Understand database design principles and normalization.",
      "Learn about relational and non-relational database models.",
      "Work with database management systems like MySQL and MongoDB.",
      "Implement security and backup strategies for databases."
    ],
    curriculum: [
      "Introduction to Databases",
      "Database Design and Normalization",
      "Relational vs Non-Relational Databases",
      "Database Management Tools",
      "Database Security and Backup"
    ],
    instructor: "Michael Brown",
    instructorBio: "Michael is a database architect with over 15 years of experience in database design and management.",
    courseDetails: "A comprehensive guide to managing databases for developers and administrators."
  },
  {
    id: 11,
    name: "SQL",
    description: "Learn SQL for querying and managing relational databases from beginner to advanced levels.",
    prerequisites: "No prior experience with databases is needed.",
    learningOutcomes: [
      "Understand SQL syntax and fundamental concepts.",
      "Learn how to write complex queries and optimize performance.",
      "Work with joins, subqueries, and aggregate functions.",
      "Understand database administration and security practices."
    ],
    curriculum: [
      "Introduction to SQL",
      "Basic Querying and CRUD Operations",
      "Joins and Subqueries",
      "Aggregate Functions and Performance Optimization",
      "Database Administration with SQL"
    ],
    instructor: "Sophia Lee",
    instructorBio: "Sophia is a database specialist and SQL trainer with a focus on relational database systems.",
    courseDetails: "Perfect for data analysts and developers working with relational databases."
  },
  {
    id: 12,
    name: "C++",
    description: "Learn C++ programming from the basics to advanced systems programming and algorithms.",
    prerequisites: "Basic programming knowledge is helpful but not required.",
    learningOutcomes: [
      "Understand C++ syntax and object-oriented programming concepts.",
      "Learn memory management and pointers.",
      "Develop efficient algorithms and data structures.",
      "Build system-level applications using C++."
    ],
    curriculum: [
      "Introduction to C++",
      "Object-Oriented Programming in C++",
      "Memory Management and Pointers",
      "Data Structures and Algorithms",
      "Building System-Level Applications"
    ],
    instructor: "David Wilson",
    instructorBio: "David is a software engineer specializing in C++ and systems programming with over 10 years of experience.",
    courseDetails: "Ideal for programmers aiming to master system-level programming."
  },                 
  {
    id: 13,
    name: "Python",
    description:
      "Master Python programming from basics to advanced concepts including data science.",
    prerequisites: "Basic computer literacy.",
    learningOutcomes: [
      "Understand Python syntax and data structures.",
      "Work with libraries for web development, data analysis, and AI.",
      "Write clean and maintainable Python code.",
      "Develop scalable applications."
    ],
    curriculum: [
      "Introduction to Python",
      "Data Structures and Functions",
      "Advanced Python Techniques",
      "Applications in AI and Data Science"
    ],
    instructor: "Chris Johnson",
    instructorBio: "Chris is a software developer and Python trainer with extensive industry experience.",
    courseDetails: "Perfect for aspiring developers and data scientists."
  },
  {
    id: 15,
    name: "System Administration",
    description: "Learn the skills required to manage and maintain computer systems and networks.",
    prerequisites: "Basic knowledge of computer systems is recommended.",
    learningOutcomes: [
      "Understand operating systems and system architecture.",
      "Learn how to configure and manage computer networks.",
      "Implement system security and disaster recovery strategies.",
      "Gain hands-on experience with server and virtualization tools."
    ],
    curriculum: [
      "Introduction to System Administration",
      "Operating Systems and Architecture",
      "Network Configuration and Management",
      "System Security and Backup Strategies",
      "Virtualization and Cloud Administration"
    ],
    instructor: "Rachel Green",
    instructorBio: "Rachel is an experienced system administrator with expertise in server management and cloud technologies.",
    courseDetails: "Perfect for aspiring system administrators and IT professionals."
  },
  {
    id: 14,
    name: "Project Management",
    description: "Learn the principles of project management from initiation to successful completion.",
    prerequisites: "No prior experience required.",
    learningOutcomes: [
      "Understand the project lifecycle and methodologies like Agile and Waterfall.",
      "Learn how to plan, execute, and monitor projects effectively.",
      "Develop skills in risk management and stakeholder communication.",
      "Master tools like MS Project, Trello, and Jira."
    ],
    curriculum: [
      "Introduction to Project Management",
      "Project Lifecycle and Methodologies",
      "Project Planning and Scheduling",
      "Risk Management and Communication",
      "Tools for Project Management"
    ],
    instructor: "Mark Stevens",
    instructorBio: "Mark is a certified project manager with 15 years of experience managing diverse projects in various industries.",
    courseDetails: "An ideal course for anyone looking to excel in managing projects professionally."
  },
  {
    id: 16,
    name: "Business Management",
    description: "Master the fundamentals of business management and leadership to drive organizational success.",
    prerequisites: "No prior experience is needed.",
    learningOutcomes: [
      "Understand business principles and organizational structures.",
      "Learn financial management and strategic planning.",
      "Develop leadership and team management skills.",
      "Explore marketing, sales, and operational processes."
    ],
    curriculum: [
      "Introduction to Business Management",
      "Organizational Structures and Leadership",
      "Financial Management and Budgeting",
      "Marketing and Sales Strategies",
      "Operations and Process Improvement"
    ],
    instructor: "Laura Mitchell",
    instructorBio: "Laura is a seasoned business consultant and management trainer with extensive experience in corporate leadership.",
    courseDetails: "Perfect for aspiring managers and entrepreneurs looking to enhance their business acumen."
  },
  {
    id: 17,
    name: "Spanish",
    description: "Learn Spanish from basic conversational phrases to advanced grammar and fluency.",
    prerequisites: "No prior knowledge of Spanish is required.",
    learningOutcomes: [
      "Master basic Spanish vocabulary and grammar.",
      "Engage in everyday conversations confidently.",
      "Understand Spanish culture and expressions.",
      "Advance to fluent reading, writing, and speaking."
    ],
    curriculum: [
      "Introduction to Spanish",
      "Basic Vocabulary and Grammar",
      "Conversational Spanish",
      "Intermediate Grammar and Writing",
      "Advanced Fluency and Cultural Immersion"
    ],
    instructor: "Carlos Gomez",
    instructorBio: "Carlos is a native Spanish speaker and certified language instructor with a passion for teaching.",
    courseDetails: "Ideal for travelers, students, and professionals aiming to communicate in Spanish fluently."
  },
  {
    id: 18,
    name: "Italian",
    description: "Learn Italian from beginner basics to advanced fluency, exploring its rich culture along the way.",
    prerequisites: "No prior knowledge of Italian is required.",
    learningOutcomes: [
      "Master essential Italian vocabulary and grammar.",
      "Engage in basic and intermediate conversations.",
      "Learn about Italian culture, food, and traditions.",
      "Achieve fluency in reading, writing, and speaking Italian."
    ],
    curriculum: [
      "Introduction to Italian",
      "Basic Vocabulary and Grammar",
      "Conversational Italian",
      "Intermediate Grammar and Writing",
      "Advanced Fluency and Cultural Topics"
    ],
    instructor: "Maria Rossi",
    instructorBio: "Maria is a native Italian speaker and language coach with extensive experience teaching Italian to non-native learners.",
    courseDetails: "Perfect for learners interested in Italy’s language and culture."
  },
  {
    id: 19,
    name: "Astronomy",
    description: "Explore the universe, from basic stargazing to understanding the physics of stars, planets, and galaxies.",
    prerequisites: "Basic high school-level physics and math are helpful but not required.",
    learningOutcomes: [
      "Understand the structure and scale of the universe.",
      "Learn about stars, planets, and black holes.",
      "Explore cosmology and the Big Bang theory.",
      "Gain practical skills in stargazing and telescope use."
    ],
    curriculum: [
      "Introduction to Astronomy",
      "Solar System and Planets",
      "Stars and Galaxies",
      "Cosmology and the Universe",
      "Practical Astronomy Techniques"
    ],
    instructor: "Dr. Neil Carter",
    instructorBio: "Dr. Carter is an astrophysicist with a decade of experience in astronomical research and education.",
    courseDetails: "Perfect for anyone fascinated by the mysteries of the cosmos."
  },
  {
    id: 20,
    name: "Spatial Technologies",
    description: "Learn the principles and applications of spatial technologies, including GIS, remote sensing, and mapping.",
    prerequisites: "Basic computer skills are recommended.",
    learningOutcomes: [
      "Understand GIS principles and spatial data concepts.",
      "Learn remote sensing techniques and image analysis.",
      "Use mapping tools to analyze spatial patterns.",
      "Apply spatial technologies in real-world scenarios like urban planning and disaster management."
    ],
    curriculum: [
      "Introduction to Spatial Technologies",
      "Geographic Information Systems (GIS)",
      "Remote Sensing and Image Analysis",
      "Spatial Data Visualization",
      "Applications in Urban Planning and Environmental Studies"
    ],
    instructor: "Dr. Hannah Collins",
    instructorBio: "Dr. Collins is a geospatial expert with years of experience in GIS and environmental applications.",
    courseDetails: "A must-learn course for those interested in geospatial technologies and their applications."
  }  
];

const CourseList = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDescription = (id) => {
    setSelectedCourse(selectedCourse === id ? null : id);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const courseCardStyles = {
    hover: {
      backgroundColor: "#f8f9fa",
      transition: "background-color 0.3s",
      cursor: "pointer"
    },
    button: {
      marginLeft: "auto"
    },
    borderRadius:{
      borderRadius:'5px'
    }
  };

  return (
    <div>
      <Navbar/>
      <div style={{background:'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 30, 150, 0.2))', minHeight:'100vh'}}>
        <div className="container mt-4">
          <h2 className="text-center mb-4 text-dark">Course List</h2>

          <input
            type="text"
            className="form-control mb-4 border-success"
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredCourses.length === 0 && (
            <p className="text-center text-muted">No courses found.</p>
          )}

          <div className="list-group">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="list-group-item mb-3 rounded border border-dark border-opacity-50"
                style={courseCardStyles.hover}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e9ecef")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{course.name}</h5>
                  <button
                    className={`btn btn-sm ${
                      selectedCourse === course.id ? "btn-danger" : "btn-info"
                    }`}
                    style={courseCardStyles.button}
                    onClick={() => toggleDescription(course.id)}
                  >
                    {selectedCourse === course.id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
                <p className="text-muted">{course.description}</p>
                <div className={`collapse ${selectedCourse === course.id ? "show" : ""}`}>
                  <div className="course-details mt-3" style={{textAlign:'left'}}>
                    <h6><strong>Prerequisites:</strong></h6>
                    <p>{course.prerequisites}</p>

                    <h6><strong>Learning Outcomes:</strong></h6>
                    <ul>
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>

                    <h6><strong>Curriculum:</strong></h6>
                    <ul>
                      {course.curriculum.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                    <h6><strong>Instructor:</strong></h6>
                    <p>{course.instructor}</p>
                    <p>{course.instructorBio}</p>

                    <h6><strong>Course Details:</strong></h6>
                    <p>{course.courseDetails}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CourseList;