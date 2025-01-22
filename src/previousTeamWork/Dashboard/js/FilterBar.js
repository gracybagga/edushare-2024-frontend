import React, { useState, useEffect } from 'react';
import '../css/FilterBar.css';

const FilterBar = ({ onFiltersSubmit, onSearch, onQuizToggle, selectedPlay }) => {
  const [localFilters, setLocalFilters] = useState({
    search: '',
    questionType: '',
    act: '',
    scene: '',
    rank: '',
    sortBy: '',
    play: selectedPlay || '',
  });
  const [quizMode, setQuizMode] = useState(false);

  useEffect(() => {
    if (selectedPlay) {
      setLocalFilters(prevFilters => ({
        ...prevFilters,
        play: selectedPlay,
      }));
    }
  }, [selectedPlay]);

  const handleChange = (filterName, value) => {
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSubmit = () => {
    onFiltersSubmit({ ...localFilters, play: localFilters.play });
    onSearch(localFilters.search);
  };

  const handleClearFilters = () => {
    setLocalFilters({ search: '', questionType: '', act: '', scene: '', rank: '', sortBy: '', play: '' });
    onFiltersSubmit({ search: '', questionType: '', act: '', scene: '', rank: '', sortBy: '', play: '' });
    onSearch('');
  };

  const toggleQuizMode = () => {
    setQuizMode(!quizMode);
    onQuizToggle();
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="filter-item">
          <select
            className="custom-select"
            id="plays"
            value={localFilters.play}
            onChange={(e) => {
              const value = e.target.value;
              handleChange('play', value);
              onFiltersSubmit({ ...localFilters, play: value });
            }}
          >
            <option value="">PLAYS</option>
            <option value="65c3b2d70347854b7f63b6ed">Romeo and Juliet</option>
            <option value="6685ee7cf074dce97ec8043a">Hamlet</option>
            {/* Add more play options here */}
          </select>
        </div>
        <div className="separator">|</div>
        <div className="filter-item">
          <select className="custom-select" id="novels" onChange={(e) => handleChange('novels', e.target.value)}>
            <option value="">NOVELS</option>
            {/* Add novel options here */}
          </select>
        </div>
        <div className="separator">|</div>
        <div className="filter-item">
          <select className="custom-select" id="projects" onChange={(e) => handleChange('projects', e.target.value)}>
            <option value="">PROJECTS</option>
            {/* Add project options here */}
          </select>
        </div>
        <div className="separator">|</div>
        <div className="filter-item">
          <select className="custom-select" id="grammar" onChange={(e) => handleChange('grammar', e.target.value)}>
            <option value="">GRAMMAR</option>
            {/* Add grammar options here */}
          </select>
        </div>
        <button className="add-button" onClick={handleSubmit}>+</button>
        <button className={`quiz-button ${quizMode ? 'active' : ''}`} onClick={toggleQuizMode}>Quiz</button>
      </div>
    </div>
  );
};

export default FilterBar;
