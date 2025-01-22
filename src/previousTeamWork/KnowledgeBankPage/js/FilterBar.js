import React, { useState } from 'react';

const FilterBar = ({ onFiltersSubmit }) => {
  const [localFilters, setLocalFilters] = useState({
    questionType: '',
    act: '',
    scene: '',
    rank: '',
    search: ''
  });
  const [search, setSearch] = useState(''); // State to hold the search term

  const handleChange = (filterName, value) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSearchButtonClick = () => {
    const filters = { ...localFilters, search }; // Include search term in filters
    onFiltersSubmit(filters); // Notify parent component about filters
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={localFilters.questionType} onChange={(e) => handleChange('questionType', e.target.value)}>
        <option value="">Question Type</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="shortAnswer">Short Answer</option>
        <option value="trueFalse">True/False</option>
      </select>
      <input
        type="number"
        placeholder="Act"
        value={localFilters.act}
        onChange={(e) => handleChange('act', e.target.value)}
      />
      <input
        type="number"
        placeholder="Scene"
        value={localFilters.scene}
        onChange={(e) => handleChange('scene', e.target.value)}
      />
      <input
        type="number"
        placeholder="Rank"
        value={localFilters.rank}
        onChange={(e) => handleChange('rank', e.target.value)}
      />
      <button onClick={handleSearchButtonClick}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;

