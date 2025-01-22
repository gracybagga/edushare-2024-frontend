import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/PersonalFile.css';
import TakeTest from './TakeTest';

function PersonalFile({ token, userName}) {
    const [tests, setTests] = useState([]);
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
    const [expandedSection, setExpandedSection] = useState(null);
    const [countdownTime, setCountdownTime] = useState(5); // starts from 5 seconds
    const [pendingRemovals, setPendingRemovals] = useState({});
    const [removalIntervals, setRemovalIntervals] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const [selectedTest, setSelectedTest] = useState(null);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const [userAnswers, setUserAnswers] = useState({});
    const [isTakingTest, setIsTakingTest] = useState(false);

    useEffect(() => {
        console.log("Token received in PersonalFile:", token); // Debugging token

        if (!token) {
            console.error("Token is undefined in PersonalFile");
            return;
        }

        const fetchUserTestsAndQuestions = async () => {
            const headers = { Authorization: `Bearer ${token}` };
            
            try {
                // Fetch tests created by the user
                const testsResponse = await axios.get(`${apiUrl}/api/tests/user`, { headers });
                console.log("Tests fetched:", testsResponse.data); // Debugging fetched tests
                setTests(testsResponse.data);

                // Fetch bookmarked questions by the user
                const bookmarkedQuestionsResponse = await axios.get(`${apiUrl}/kb/bookmarks`, { headers });
                console.log("Bookmarked questions fetched:", bookmarkedQuestionsResponse.data); // Debugging fetched bookmarked questions
                setBookmarkedQuestions(bookmarkedQuestionsResponse.data.bookmarked); // Adjust depending on the actual response structure
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchUserTestsAndQuestions();
    }, [token, apiUrl]);

    const handleRemoveBookmark = async (questionId) => {
        setPendingRemovals(prev => ({ ...prev, [questionId]: 5 }));
        const intervalId = setInterval(() => {
            setPendingRemovals(prev => {
                if (prev[questionId] === 1) {
                    clearInterval(intervalId);
                    removeBookmark(questionId).catch((error) => console.error("Error removing bookmark:", error));
                    return { ...prev, [questionId]: undefined };
                }
                return { ...prev, [questionId]: prev[questionId] - 1 };
            });
        }, 1000);
        
        setRemovalIntervals(prev => ({ ...prev, [questionId]: intervalId }));
    };
    
    // Extracted removal logic to its own async function for clarity
    const removeBookmark = async (questionId) => {
        const response = await axios.delete(`${apiUrl}/kb/remove/${questionId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    
        if (!response.data.success) {
            throw new Error('Failed to remove bookmark');
        }

        // Update UI immediately upon removal
        fetchBookmarkedQuestions();
    };

    const handleUndoRemove = (questionId) => {
        clearInterval(removalIntervals[questionId]);
        setPendingRemovals(prev => ({ ...prev, [questionId]: undefined }));
    };

    const fetchBookmarkedQuestions = async () => {
        try {
            const bookmarkedQuestionsResponse = await axios.get(`${apiUrl}/kb/bookmarks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookmarkedQuestions(bookmarkedQuestionsResponse.data.bookmarked);
        } catch (error) {
            console.error('Failed to fetch bookmarked questions:', error);
        }
    };

    const handleExpandClick = (section) => {
      setExpandedSection(section === expandedSection ? null : section); // Toggle expand/collapse
    };

    const handleTestClick = (testId) => {
        const test = tests.find(t => t._id === testId);
        setSelectedTest(test); // Keep the selected test for viewing details
        setIsTakingTest(false); // Reset to not taking test when a test is clicked
        console.log("Selected Test Data:", JSON.stringify(test, null, 2));
    };

    // New function to handle starting the test
    const handleStartTest = () => {
        console.log("Starting test..."); // Debugging message
        setIsTakingTest(true); // This should trigger rendering of the TakeTest component
    };
    
    // Debug before rendering the TakeTest component
    console.log("isTakingTest:", isTakingTest, "selectedTest:", selectedTest);
    
    // Conditional rendering of TakeTest component
    {isTakingTest && selectedTest && (
        <TakeTest test={selectedTest} onClose={() => { setIsTakingTest(false); setSelectedTest(null); }} />
    )}
    
    const renderQuestionContent = (question) => {
        if (question.questionType === 'multipleChoice') {
            const options = question.option; // Corrected from 'question.options'
            console.log("Options for question:", question._id, options);
    
            if (options && options.length > 0) {
                return (
                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question_${question._id}`}
                                        value={option}
                                        disabled
                                        checked={question.answer === option}
                                    /> {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                );
            } else {
                // If options are empty or undefined
                return <p>No options available for this question</p>;
            }
        } else if (question.questionType === 'trueFalse') {
            return (
                <ul>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name={`question_${question._id}`}
                                value="True"
                                disabled
                                checked={question.answer === 'True'}
                            />
                            True
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name={`question_${question._id}`}
                                value="False"
                                disabled
                                checked={question.answer === 'False'}
                            />
                            False
                        </label>
                    </li>
                </ul>
            );
        } else if (question.questionType === 'shortAnswer') {
            return <input type="text" value={question.answer} disabled />;
        }
    
        return null; // Return null if question type is not recognized or options are not available
    };
    
    
    

    // PersonalFile.js JSX Part
    return (
        <div className="personal-file-container">
            <div className="username-box">
                <h2 className="personal-file-title">{userName}'s Personal File</h2>
            </div>
            <div className={`personal-file-content ${expandedSection ? 'expanded' : ''}`}>
                <div className={`personal-file-section ${expandedSection === 'tests' ? 'full-width' : ''}`}>
                    <h3 className="personal-file-subtitle">My Tests</h3>
                    <button onClick={() => handleExpandClick('tests')} className="expand-collapse-btn">
                        {expandedSection === 'tests' ? 'Shrink' : 'Expand'}
                    </button>
                    <ul className="personal-file-list">
                        {tests.map(test => (
                            <li key={test._id} className="personal-file-item" onClick={() => handleTestClick(test._id)}>
                                {test.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`personal-file-section ${expandedSection === 'questions' ? 'full-width' : ''}`}>
                    <h3 className="personal-file-subtitle">Bookmarked Questions</h3>
                    <button onClick={() => handleExpandClick('questions')} className="expand-collapse-btn">
                        {expandedSection === 'questions' ? 'Shrink' : 'Expand'}
                    </button>
                    <ul className="personal-file-list">
                        {bookmarkedQuestions.map(question => (
                            <li key={question._id} className="personal-file-item">
                                <p className="personal-file-question">{question.question}</p>
                                {question.questionType === 'multipleChoice' && question.options && (
                                    <ul className="personal-file-options">
                                        {question.options.map((option, index) => (
                                            <li key={index} className="personal-file-option">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question_${question._id}`}
                                                        value={option}
                                                        disabled
                                                        checked={question.answer === option}
                                                        className="personal-file-radio"
                                                    /> {option}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {question.questionType === 'trueFalse' && (
                                    <ul className="personal-file-options">
                                        <li className="personal-file-option">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question_${question._id}`}
                                                    value="True"
                                                    disabled
                                                    checked={question.answer === 'True'}
                                                    className="personal-file-radio"
                                                /> True
                                            </label>
                                        </li>
                                        <li className="personal-file-option">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question_${question._id}`}
                                                    value="False"
                                                    disabled
                                                    checked={question.answer === 'False'}
                                                    className="personal-file-radio"
                                                /> False
                                            </label>
                                        </li>
                                    </ul>
                                )}
                                {question.questionType === 'shortAnswer' && (
                                    <p className="personal-file-answer">{question.answer}</p>
                                )}
                                {/* Undo and removal countdown functionality */}
                                {pendingRemovals[question._id] !== undefined ? (
                                    <>
                                        <button onClick={() => handleUndoRemove(question._id)} className="undo-remove-btn">
                                            Undo
                                        </button>
                                        <div className="countdown-bar" style={{ width: `${(pendingRemovals[question._id] / 5) * 100}%` }}></div>
                                    </>
                                ) : (
                                    <button onClick={() => handleRemoveBookmark(question._id)} className="remove-btn">
                                        Remove
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {selectedTest && (
    <div>
        {/* Test Details Overlay */}
        <div className="test-details-overlay">
            <div className="test-details-container">
                <div className={`test-preview-details ${isTakingTest ? 'hidden' : ''}`}>
                    <h2>Test: {selectedTest.title}</h2>
                    <p>Subject: {selectedTest.subject}</p>
                    <div>
                        <h3>Questions:</h3>
                        <ul>
                            {selectedTest.questions && selectedTest.questions.map((question, index) => (
                                <li key={index}>
                                    <p>
                                        <strong>Question {index + 1}:</strong> {question.question}
                                    </p>
                                    {renderQuestionContent(question)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <button onClick={handleStartTest}>Take Test</button>
                        <button onClick={() => setSelectedTest(null)}>Close</button>
                    </div>
                </div>
                {/* Take Test Section */}
                {isTakingTest && selectedTest && (
                    <div className="take-test-section">
                        <TakeTest test={selectedTest} onClose={() => { setIsTakingTest(false); setSelectedTest(null); }} />
                    </div>
                )}
            </div>
        </div>
    </div>
)}





        </div>
    );
}    

export default PersonalFile;



