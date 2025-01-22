import React from 'react';
import '../css/PlaysList.css';

const PlaysList = ({ plays, onSelectPlay }) => {
  // Define the mapping from play name to ObjectId
  const playMapping = {
    "Romeo and Juliet": "65c3b2d70347854b7f63b6ed",
    "Hamlet": "6685ee7cf074dce97ec8043a",
    // Add more play mappings here
  };

  return (
    <div className="plays-list-container">
      <h2 className="plays-list-heading">Plays You May Study</h2>
      <ul className="plays-list">
        {plays.map((play, index) => (
          <li key={index} className="play-item" onClick={() => onSelectPlay(playMapping[play])}>
            {play}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaysList;
