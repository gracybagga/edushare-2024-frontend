import React from 'react';
import { useLocation } from 'react-router-dom';
import './SettingsPage.css';

function SettingsPage() {
  const location = useLocation();
  const theme = location.state?.theme || 'light'; // Default to light if no theme is provided

  const sampleData = ['Profile Settings', 'Account Security', 'Notification Preferences'];

  return (
    <div className={`settings-page ${theme === 'dark' ? 'dark' : 'light'}`}>
      <h1>Settings Page</h1>
      <ul>
        {sampleData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SettingsPage;
