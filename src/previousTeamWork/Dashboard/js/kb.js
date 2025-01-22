import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/kb.css";
import createNotification from '../../../notificationAPI';
import FilterBar from "./FilterBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTrashAlt, faExclamationTriangle, faChevronDown, faChevronUp, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function KB({ search, playQuestions, selectedPlayId, selectedPlay }) {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleAnswer, setVisibleAnswer] = useState(null);
  const [expandedAct, setExpandedAct] = useState(null);
  const [expandedScene, setExpandedScene] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState({ acts: {}, scenes: {}, questions: {} });
  const apiUrl = process.env.REACT_APP_API_URL;

  const [filters, setFilters] = useState({
    search: '',
    questionType: '',
    act: '',
    scene: '',
    rank: '',
    play: selectedPlayId || '',
  });

  const [visibleInfo, setVisibleInfo] = useState(null);

  useEffect(() => {
    fetchBookmarkedQuestions();
  }, [location.search]);

  useEffect(() => {
    if (selectedPlay) {
      setFilters(prevFilters => ({
        ...prevFilters,
        play: selectedPlay,
      }));
      fetchQuestions(selectedPlay);
    }
  }, [selectedPlay]);

  const fetchBookmarkedQuestions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/kb/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookmarkedIds = response.data.bookmarked.map(item => item._id.toString());
      setBookmarkedQuestions(bookmarkedIds);
    } catch (error) {
      console.error('Error fetching bookmarked questions:', error);
    }
  };

  const fetchQuestions = async (playId) => {
    if (!playId) return;

    const queryParams = { ...filters, play: playId };
    console.log('Query Params:', queryParams);
    try {
      const response = await axios.get(`${apiUrl}/kb/questions`, { params: queryParams });
      let sortedQuestions = response.data;

      if (filters.sortBy === "newest") {
        sortedQuestions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (filters.sortBy === "oldest") {
        sortedQuestions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }

      setQuestions(sortedQuestions);
      setFilteredQuestions(sortedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions(filters.play);
  }, [filters]);

  const updateQuestionRating = (updatedQuestion) => {
    setQuestions(currentQuestions =>
      currentQuestions.map(question =>
        question._id === updatedQuestion._id ? updatedQuestion : question
      )
    );
  };

  const handleBookmarkClick = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        setMessage('You need to be logged in to bookmark questions.');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        return;
      }

      const data = {
        questionId: questionId,
        gradeLevel: 'Grade 10',
        createdBy: {
          userType: 'student',
          userID: '123456789'
        }
      };

      const response = await axios.post(
        `${apiUrl}/kb/bookmark/${questionId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        await createNotification("You bookmarked a question", token);
        setMessage('Question bookmarked successfully.');
        fetchBookmarkedQuestions();
        setQuestions(prevQuestions =>
          prevQuestions.map(q =>
            q._id === questionId ? { ...q, rank: response.data.question.rank } : q
          )
        );
      } else {
        setMessage(response.data.message || 'Failed to bookmark question.');
      }
    } catch (error) {
      console.error('Error bookmarking question:', error);
      setMessage('An error occurred while bookmarking the question.');
    }
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const updateSearchFilter = (newSearch) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      search: newSearch,
    }));
  };

  const handleRemoveBookmarkClick = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        setMessage('You need to be logged in to remove bookmarks.');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        return;
      }

      const response = await axios.delete(
        `${apiUrl}/kb/remove/${questionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setMessage('Bookmark removed successfully.');
        fetchBookmarkedQuestions();
        setQuestions(prevQuestions =>
          prevQuestions.map(q =>
            q._id === questionId ? { ...q, rank: response.data.question.rank } : q
          )
        );
      } else {
        setMessage(response.data.message || 'Failed to remove bookmark.');
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
      setMessage('An error occurred while removing the bookmark.');
    }
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleReportClick = async (questionId) => {
    const issueDetails = prompt('Please provide details about the issue:');
    if (!issueDetails) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        alert('You need to be logged in to report questions.');
        return;
      }

      await axios.post(
        `${apiUrl}/kb/report/${questionId}`,
        { issueDetails },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await createNotification("Report Sent", token);
      alert('Thank you for reporting. We will look into it shortly.');
    } catch (error) {
      console.error('Error reporting question:', error);
      alert('An error occurred while reporting the question.');
    }
  };

  useEffect(() => {
    const applyFilters = (questionsList) => {
      if (!Array.isArray(questionsList)) {
        console.error('Expected an array for filtering, received:', questionsList);
        return [];
      }

      return questionsList.filter((q) => {
        return q.question.toLowerCase().includes(search.toLowerCase());
      });
    };
    setFilteredQuestions(applyFilters(questions));
  }, [search, questions]);

  const handleFiltersSubmit = (newFilters) => {
    console.log("Submitting filters:", newFilters);
    setFilters(newFilters);
  };

  const toggleAnswerVisibility = (questionId) => {
    if (visibleAnswer === questionId) {
      setVisibleAnswer(null);
    } else {
      setVisibleAnswer(questionId);
    }
  };

  const toggleActVisibility = (act) => {
    setExpandedAct(expandedAct === act ? null : act);
  };

  const toggleSceneVisibility = (scene) => {
    setExpandedScene(expandedScene === scene ? null : scene);
  };

  const indexToLetter = (index) => String.fromCharCode(65 + index);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const groupQuestionsByActAndScene = (questionsList) => {
    const grouped = {};
    questionsList.forEach((q) => {
      if (!grouped[q.act]) {
        grouped[q.act] = {};
      }
      if (!grouped[q.act][q.scene]) {
        grouped[q.act][q.scene] = [];
      }
      grouped[q.act][q.scene].push(q);
    });
    return grouped;
  };

  const groupedQuestions = groupQuestionsByActAndScene(filteredQuestions);

  const handleQuizToggle = () => {
    setQuizMode(!quizMode);
    if (!quizMode) {
      setSelectedItems({ acts: {}, scenes: {}, questions: {} });
    }
  };

  const handleCheckboxChange = (type, id, parentId = null) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = {
        acts: { ...prevSelectedItems.acts },
        scenes: { ...prevSelectedItems.scenes },
        questions: { ...prevSelectedItems.questions },
      };

      if (type === 'act') {
        const isSelected = !newSelectedItems.acts[id];
        newSelectedItems.acts[id] = isSelected;

        Object.keys(groupedQuestions[id]).forEach(sceneId => {
          newSelectedItems.scenes[sceneId] = isSelected;
          groupedQuestions[id][sceneId].forEach(q => {
            newSelectedItems.questions[q._id] = isSelected;
          });
        });
      } else if (type === 'scene') {
        const isSelected = !newSelectedItems.scenes[id];
        newSelectedItems.scenes[id] = isSelected;

        groupedQuestions[parentId][id].forEach(q => {
          newSelectedItems.questions[q._id] = isSelected;
        });

        const allScenesSelected = Object.keys(groupedQuestions[parentId])
          .every(sceneId => newSelectedItems.scenes[sceneId]);
        newSelectedItems.acts[parentId] = allScenesSelected;
      } else if (type === 'question') {
        const isSelected = !newSelectedItems.questions[id];
        newSelectedItems.questions[id] = isSelected;

        const allQuestionsSelected = groupedQuestions[parentId].every(q => newSelectedItems.questions[q._id]);
        newSelectedItems.scenes[parentId] = allQuestionsSelected;

        const sceneParent = Object.keys(groupedQuestions).find(act => 
          Object.keys(groupedQuestions[act]).includes(parentId)
        );
        const allScenesSelected = Object.keys(groupedQuestions[sceneParent])
          .every(sceneId => newSelectedItems.scenes[sceneId]);
        newSelectedItems.acts[sceneParent] = allScenesSelected;
      }

      return newSelectedItems;
    });
  };

  const handleActCheckboxChange = (event, act) => {
    event.stopPropagation();
    console.log(`Act checkbox clicked - act: ${act}`);
    handleCheckboxChange('act', act);
  };

  const handleSceneCheckboxChange = (event, scene, act) => {
    event.stopPropagation();
    console.log(`Scene checkbox clicked - scene: ${scene}, act: ${act}`);
    handleCheckboxChange('scene', scene, act);
  };

  const handleQuestionCheckboxChange = (event, questionId, scene) => {
    event.stopPropagation();
    console.log(`Question checkbox clicked - questionId: ${questionId}, scene: ${scene}`);
    handleCheckboxChange('question', questionId, scene);
  };

  const toggleInfoVisibility = (questionId) => {
    if (visibleInfo === questionId) {
      setVisibleInfo(null);
    } else {
      setVisibleInfo(questionId);
    }
  };

  const handleCreateQuiz = async () => {
    const selectedQuestions = Object.keys(selectedItems.questions).filter(questionId => selectedItems.questions[questionId]);
    if (selectedQuestions.length === 0) {
      setMessage('No questions selected for the quiz.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    const quizData = {
      title: 'Sample Quiz Title', // Default values, can be changed
      subject: 'Sample Subject',
      questions: selectedQuestions,
      amountOfQuestions: selectedQuestions.length,
      topicOfQuestions: 'Sample Topic',
      gradeLevel: 'Sample Grade',
      createdBy: 'Sample User',
      dateCreated: new Date().toISOString(),
      userRole: 'student', // Example value
    };

    try {
      const response = await axios.post(`${apiUrl}/api/tests`, quizData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status === 201) {
        setMessage('Quiz created successfully.');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        setMessage('Failed to create quiz.');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      setMessage('An error occurred while creating the quiz.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <section className="kb-container">
      <h2 className="kb-title">Knowledge Bank</h2>
      <FilterBar
        onFiltersSubmit={handleFiltersSubmit}
        currentSearch={filters.search}
        onSearch={updateSearchFilter}
        play={selectedPlayId}
        selectedPlay={selectedPlay} // Pass selected play to FilterBar
        onQuizToggle={handleQuizToggle}
      />
      {showMessage && <div className="kb-message">{message}</div>}
      {questions.length > 0 && (
        <div className="kb-questions">
          {Object.keys(groupedQuestions).map((act) => (
            <div key={act} className="kb-act">
              <div className={`kb-act-header kb-checkbox-container ${selectedItems.acts[act] ? 'checked' : ''}`}>
                {quizMode && (
                  <input
                    type="checkbox"
                    checked={!!selectedItems.acts[act]}
                    onChange={(event) => handleActCheckboxChange(event, act)}
                  />
                )}
                <h3 onClick={() => toggleActVisibility(act)}>Act {act} <FontAwesomeIcon icon={expandedAct === act ? faChevronUp : faChevronDown} /></h3>
              </div>
              {expandedAct === act && (
                <div className="kb-scenes">
                  {Object.keys(groupedQuestions[act]).map((scene) => (
                    <div key={scene} className={`kb-scene kb-checkbox-container ${selectedItems.scenes[scene] ? 'checked' : ''}`}>
                      <div className="kb-scene-header">
                        {quizMode && (
                          <input
                            type="checkbox"
                            checked={!!selectedItems.scenes[scene]}
                            onChange={(event) => handleSceneCheckboxChange(event, scene, act)}
                          />
                        )}
                        <h4 onClick={() => toggleSceneVisibility(scene)}>Scene {scene} <FontAwesomeIcon icon={expandedScene === scene ? faChevronUp : faChevronDown} /></h4>
                      </div>
                      {expandedScene === scene && (
                        <div className="kb-questions-list">
                          {groupedQuestions[act][scene].map((q) => (
                            <article key={q._id} className={`kb-question-container kb-checkbox-container ${selectedItems.questions[q._id] ? 'checked' : ''}`}>
                              <header className="kb-question-header">
                                <div className="kb-question-header-left">
                                  {quizMode && (
                                    <input
                                      type="checkbox"
                                      checked={!!selectedItems.questions[q._id]}
                                      onChange={(event) => handleQuestionCheckboxChange(event, q._id, scene)}
                                    />
                                  )}
                                  <h3>{q.question}</h3>
                                </div>
                                <div className="kb-question-actions">
                                  <button
                                    className={`kb-toggle-answer-btn ${visibleAnswer === q._id ? 'is-open' : ''}`}
                                    onClick={() => toggleAnswerVisibility(q._id)}
                                    aria-label="Toggle answer visibility"
                                    aria-expanded={visibleAnswer === q._id}
                                  >
                                    <FontAwesomeIcon icon={visibleAnswer === q._id ? faChevronUp : faChevronDown} />
                                  </button>
                                  {bookmarkedQuestions.includes(q._id.toString()) ? (
                                    <button
                                      onClick={() => handleRemoveBookmarkClick(q._id)}
                                      aria-label="Remove bookmark from question"
                                      className="kb-action-button kb-remove-bookmark-button"
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleBookmarkClick(q._id)}
                                      aria-label="Bookmark question"
                                      className="kb-action-button kb-bookmark-button"
                                    >
                                      <FontAwesomeIcon icon={faBookmark} />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleReportClick(q._id)}
                                    aria-label="Report question"
                                    className="kb-action-button kb-report-button"
                                  >
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                  </button>
                                  <button
                                    onClick={() => toggleInfoVisibility(q._id)}
                                    aria-label="Toggle info visibility"
                                    className="kb-action-button kb-info-button"
                                  >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                  </button>
                                </div>
                              </header>
                              {visibleAnswer === q._id && (
                                <div className="kb-answer is-open">
                                  {q.questionType === 'multipleChoice' && Array.isArray(q.option) ? (
                                    <ul>
                                      {q.option.map((option, index) => (
                                        <div
                                          key={index}
                                          style={{ color: q.answer === option ? '#2cbe4e' : '#ccc' }}
                                          className={`questionOption ${q.answer === option ? 'correctAnswer' : ''}`}
                                        >
                                          Option {indexToLetter(index)}: {option}
                                        </div>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p>{q.answer}</p>
                                  )}
                                </div>
                              )}
                              {visibleInfo === q._id && (
                                <footer className="kb-question-info-container is-open">
                                  <div className="info-item">Type: {q.questionType.replace(/([A-Z])/g, ' $1').trim()}</div>
                                  <div className="info-item">Act: {q.act}</div>
                                  <div className="info-item">Scene: {q.scene}</div>
                                  <div className="info-item">Rating: {q.rank}</div>
                                  <div className="info-item">Date Created: {formatDate(q.createdAt)}</div>
                                </footer>
                              )}
                            </article>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {quizMode && (
        <div className="create-quiz-container">
          <button className="create-quiz-button" onClick={handleCreateQuiz}>Create Quiz</button>
        </div>
      )}
    </section>
  );
}

export default KB;
