import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CourseOptions.css';

const CourseOptions = ({ subjectName, onSelectQuestions }) => {
  const [showDropdown, setShowDropdown] = useState({ plays: false, books: false, grammar: false, tools: false });
  const [plays, setPlays] = useState([]);
  const placeholders = ['Books', 'Mathematics', 'Science', 'Languages', 'History', 'Tools', 'Grammar'];

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/plays`);
        setPlays(response.data);
      } catch (error) {
        console.error('Failed to fetch plays:', error);
      }
    };

    fetchPlays();
  }, []);

  const handlePlayClick = async (playId, e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    try {
      const response = await axios.get(`/api/plays/${playId}/questions`);
      onSelectQuestions(response.data, playId);
    } catch (error) {
      console.error(`Failed to fetch questions for play ${playId}:`, error);
    }
  };

  const toggleDropdown = (key) => {
    setShowDropdown(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="course-options">
      <h2>Options for {subjectName}</h2>
      <div className="dropdown" onClick={() => toggleDropdown('plays')}>
        <button className="dropbtn">Plays</button>
        {showDropdown.plays && (
          <div className="dropdown-content">
            {plays.map((play) => (
              <a href="#" key={play._id} onClick={(e) => handlePlayClick(play._id, e)}>
                {play.name}
              </a>
            ))}
          </div>
        )}
      </div>
      {placeholders.map((placeholder, index) => (
        <div key={index} className="dropdown" onClick={() => toggleDropdown(placeholder.toLowerCase())}>
          <button className="dropbtn">{placeholder}</button>
          {showDropdown[placeholder.toLowerCase()] && (
            <div className="dropdown-content">
              <p>Placeholder content for {placeholder}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
