import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import styles from '../css/kb.css';
import FilterBar from './FilterBar'; // Assuming FilterBar is in the same directory

const KnowledgeBank = () => {
  const [questions, setQuestions] = useState([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation(); // Use this hook to access the current location
  const navigate = useNavigate(); // Initialize useNavigate
  
//   // Directly use process.env.REACT_APP_API_URL for apiUrl
//   // Provide a fallback URL if REACT_APP_API_URL is not defined
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";


  const [filters, setFilters] = useState({
    search: '',
    questionType: '',
    act: '',
    scene: '',
    rank: '',
  });

  useEffect(() => {
    fetchBookmarkedQuestions();
    fetchQuestions(filters); // Ensure this is called with the current filters
  }, [filters, location.search]); // Depend on filters to automatically re-fetch questions

  // Function to fetch bookmarked questions
  const fetchBookmarkedQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
  
      const response = await axios.get(`${apiUrl}/kb/bookmarks`, {
        withCredentials: true,
        headers: headers,
      });
  
      console.log(response.data);
  
      const bookmarkedIds = response.data.bookmarked.map((item) => item._id.toString());
      setBookmarkedQuestions(bookmarkedIds);
    } catch (error) {
      console.error('Error fetching bookmarked questions:', error);
    }
  };

  const handleFiltersSubmit = (newFilters) => {
    // Construct a query string from newFilters
    const searchParams = new URLSearchParams();

    if (newFilters.search) {
      searchParams.set("search", newFilters.search); // Use "search" as the query parameter
  }

    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        searchParams.append(key, newFilters[key]);
      }
    });

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) { // This check ensures only non-empty values are added
        searchParams.set(key, value);
      }
    });

    // Use navigate to update the URL, triggering the useEffect hook
    navigate(`/kb?${searchParams.toString()}`);
  };

  const fetchQuestions = async () => {
    const searchParams = new URLSearchParams(location.search);
    // Create an object from the URLSearchParams to pass to the API
    const params = Object.fromEntries(searchParams.entries());
  
    try {
      const response = await axios.get(`${apiUrl}/kb/questions`, { params });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search'); // Get the 'search' query parameter

    fetchQuestions();
    fetchBookmarkedQuestions(filters);
  }, [location.search, apiUrl, filters]); // Re-run this effect if the search query changes or apiUrl changes

  useEffect(() => {
    console.log(bookmarkedQuestions); 
  }, [bookmarkedQuestions]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/kb/questions`, { withCredentials: true });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
    fetchBookmarkedQuestions();
  }, []);

  const handleBookmarkClick = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
  
      const response = await axios.post(`${apiUrl}/kb/bookmark/${questionId}`, {}, { withCredentials: true , headers: headers,});
      if (response.data.success) {
        setMessage(response.data.message);
        setShowMessage(true);
        fetchBookmarkedQuestions();
        setQuestions(prevQuestions =>
          prevQuestions.map(q =>
            q._id === questionId ? { ...q, rank: response.data.question.rank } : q
          )
        );
      } else {
        setMessage(response.data.message);
      }
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error('Error bookmarking question:', error);
      setMessage('An error occurred. Please try again.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const handleRemoveBookmarkClick = async (questionId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.delete(`${apiUrl}/kb/remove/${questionId}`, {
      headers: headers,
    });

    if (response.data.success) {
      setMessage(response.data.message);
      setShowMessage(true);
      // Update state to reflect the removed bookmark
      setBookmarkedQuestions(prev => prev.filter(id => id !== questionId.toString()));
      setQuestions(prevQuestions =>
          prevQuestions.map(q =>
            q._id === questionId ? { ...q, rank: response.data.question.rank } : q
          )
        );
    } else {
      setMessage(response.data.message);
    }
    setTimeout(() => setShowMessage(false), 3000);
  } catch (error) {
    console.error('Error removing bookmark:', error.response ? error.response.data : error);
    setMessage('An error occurred. Please try again.');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }
};

  const handleReportClick = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
  
    const issueDetails = prompt('Please provide details about the issue:');
    
    if (issueDetails) {
      
      const response = await axios.post(`${apiUrl}/kb/report/${questionId}`, {issueDetails}, { withCredentials: true , headers: headers, });
      
      if (response.data.success) {
        alert('Question reported successfully!');
      } else {
        alert('Failed to report question. Please try again.');
      }
    }
   }
    catch (error) {
      console.error('Error reporting question:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  return (
    <> 
     
  
      <h2 className="heading">Knowledge Bank</h2>
      {showMessage && <div className="popup">{message}</div>}
      <div className="mainContainer">
        {questions.map((q) => (
          <div key={q._id} className="questionContainer">
            <p className="rating">Rating: {q.rank}</p>
            <div className="questionDetails">
              <h3 className="questionText">{q.question}</h3>
              {!bookmarkedQuestions.includes(q._id.toString()) && (
          <button
            onClick={() => handleBookmarkClick(q._id)}
            className="bookmarkButton"
          >
            Bookmark
          </button>
        )}
{bookmarkedQuestions.includes(q._id.toString()) && (
          <button
            onClick={() => handleRemoveBookmarkClick(q._id)}
            className="removeBookmarkButton"
          >
            Remove
          </button>
        )}
       </div> 
       <button onClick={() => handleReportClick(q._id)}>Report</button  >
          </div>
        ))}
      </div>
    </>
  );
};

export default KnowledgeBank;
