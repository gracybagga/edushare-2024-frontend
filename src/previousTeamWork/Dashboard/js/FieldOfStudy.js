import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import "../css/FieldOfStudy.css"
import {jwtDecode} from 'jwt-decode'; 
Chart.register(...registerables);

const token = sessionStorage.getItem("token")
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Set to true to display the legend if it's part of the design
    },
    tooltip: {
      enabled: true,
      mode: 'point',
      intersect: false,
      position: 'nearest',
      callbacks: {
        label: function (context) {
          let label = context.label || '';
          let value = context.parsed !== null ? context.parsed : '';
          // Return a custom formatted label with larger font for the grade value
          return `${value}`; // You can add additional formatting here if needed
        },
        labelTextColor: function (context) {
          return '#FFF'; // Text color for the tooltip
        }
      },
      // You can add additional tooltip styling here if needed
      bodyFont: {
        size: 20, // Larger body font size for grade value readability
        weight: 'bold', // Bold font weight for grade value
        family: 'Helvetica, Arial, sans-serif',
      },
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Opaque background for better visibility
      bodySpacing: 10,
      titleSpacing: 10,
      titleMarginBottom: 10,
      displayColors: true,
      boxWidth: 15,
      boxHeight: 15,
      borderColor: '#FFF',
      borderWidth: 1,
    },
  },
  // ...other options
};

const FieldOfStudy = () => {
  // const decodedToken = jwtDecode(token);

  const [data, setData] = useState({
    labels: [], // Your labels for each field of study
    datasets: [
      {
        label: 'Field of Study',
        data: [], // Your data points
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          // Add more colors for each field
        ],
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure the token is valid before attempting to decode it
        if (!token) {
          console.error('Token is not available');
          return;
        }
  
        const { _id: id } = jwtDecode(token);
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/user/student/${id}/grades`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("grades", response.data)
        // Define a set of background colors for the chart segments
        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#76B041', '#4D5360', '#FDB45C', '#949FB1'];
  
        // Use the response data to create the chart data
        // If the grade is 0, we still assign a small non-zero value to make it visible on the chart
        const chartData = response.data.map((subject, index) => ({
          subject: subject.subject,
          grade: subject.grade > 0 ? subject.grade : 0.01, // Use a tiny value for visibility
          color: backgroundColors[index % backgroundColors.length], // Assign a color from the predefined set
        }));
  
        // Update the chart data state with the new data
        setData({
          labels: chartData.map(item => item.subject), // The labels array contains the subject names
          datasets: [{
            label: chartData.map(d => d.labels),
            data: chartData.map(item => item.grade), // The data array contains the grades (or the tiny value for 0 grades)
            backgroundColor: chartData.map(item => item.color), // Map each subject to a color
          }],
        });
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
  
    // Invoke the fetchData function to load data
    fetchData();
  }, [token]); // The effect depends on the token
  
  const legendItems = data.labels.map((label, index) => ({
    color: data.datasets[0].backgroundColor[index],
    text: label,
  }));



 
  return (
    <div className="field-of-study-container">
      <h2 className="field-of-study-title">Field of Study</h2>
      <div className="doughnut-chart">
        <Doughnut data={data} options={options} />
      </div>
      <ul className="doughnut-legend">
        {legendItems.map((item, index) => (
          <li key={index} className="doughnut-legend-item">
            <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
            <span className="legend-text">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );}

export default FieldOfStudy;
