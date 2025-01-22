import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/UserXp.css';

function UserXP() {
  const [xp, setXp] = useState(0);
  const [minXP, setMinXP] = useState(0);
  const [maxXP, setMaxXP] = useState(25); // The XP needed for the next level
  const [level, setLevel] = useState(1);
  const [badge, setBadge] = useState('Beginner');
  
  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const fetchUserXP = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setXp(response.data.Xp);
        setLevel(response.data.level);
        setBadge(response.data.badge);
        if(level === 1){
          setMinXP(0)
          setMaxXP(25)
        }
        else if( level === 2){
          setMinXP(25)
          setMaxXP(50)
        }
        else{
          setMinXP(50)
          setMaxXP(100)
        }
        // Dynamically set maxXP based on your API response
        // setMaxXP(response.data.maxXP);
      } catch (error) {
        console.error('Error fetching user XP:', error);
      }
    };

    if (token) {
      fetchUserXP();
    }
  }, [xp, level, badge, minXP, maxXP]);

  const radius = 100; // Radius of the circle that the arc is part of
  const circumference = (Math.PI * radius * 2)/2; // Circumference of the whole circle

  const progress = (xp / maxXP) * 100; // Calculate progress as a percentage
  const progressLength = (progress / 100) * circumference; // Length of progress based on XP

  const strokeWidth = 15; // Width of the progress bar
  let badgeImageUrl;
  switch(badge) {
    case 'Beginner':
      badgeImageUrl = 'images/Beginner.jpeg'; // Update with your actual path
      break;
    case 'Intermediate':
      badgeImageUrl = 'images/Skilled.jpeg'; // Update with your actual path
      break;
    case 'Advanced':
      badgeImageUrl = 'images/Master.jpeg'; // Update with your actual path
      break;
    default:
      badgeImageUrl = 'images/Beginner.jpeg'; // Update with your actual path
  }
  
  return (
    <div className="user-xp-container"> 
       <div className="level-text">Level: {level}</div>
  <div className="badge-container">
   {xp} XP
  </div>
      <svg className="progress-ring" width="200" height="100" viewBox="0 -10 200 100">
        <path
          className="progress-ring__circle-bg"
          d="M10,90 A80,80 0 0,1 190,90"
          fill="none"
          stroke="#ddd"
          strokeWidth={strokeWidth}
        />
        <path
          className="progress-ring__circle"
          d="M10,90 A80,80 0 0,1 190,90"
          fill="none"
          stroke={progress < 20 ? '#ff4500' : progress < 70 ? '#ff8c00' : '#32CD32'}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progressLength}
          strokeLinecap="round"
        />
      </svg>
     
      <div className="xp-text"> <img src={badgeImageUrl} alt="Badge" className="badge-icon" /></div>
      <div className="xp-min-max">
        <span>{minXP} XP</span>
        <span>{maxXP} XP</span>
      
      </div>
      
    </div>
  );
}

export default UserXP;