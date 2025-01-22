import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CreateTest.css';
import createNotification from '../../../notificationAPI'

function CreateTest({ token }) {
    const [test, setTest] = useState({
        title: '',
        subject: '',
        questions: [],
        amountOfQuestions: 0,
        topicOfQuestions: '',
        gradeLevel: '',
        createdBy: '',
        dateCreated: '',
        userRole: '',
    });

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const [userData, setUserData] = useState({ _id: '', role: '', dateJoined: '' });
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]); // State for bookmarked questions
    const [error, setError] = useState('');
    const [gradeLevels, setGradeLevels] = useState([]);
    const [plays, setPlays] = useState([]);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [randomQuestionsCount, setRandomQuestionsCount] = useState('');

    useEffect(() => {
        console.log("Current token CreateTest:", token); // Check if the token is available
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
                const response = await axios.get(`${apiUrl}/api/userInfo`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData({
                    _id: response.data._id,
                    role: response.data.role,
                    dateJoined: response.data.dateJoined,
                });
                setTest(prevState => ({
                    ...prevState,
                    createdBy: response.data._id,
                    userRole: response.data.role,
                    dateCreated: new Date().toISOString(),
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data. Please check your network connection and try again.');
            }
        };

        fetchUserData();
    }, [token]); // Dependency array to prevent infinite loop

    // New useEffect for fetching bookmarked questions
    useEffect(() => {
        const fetchBookmarkedQuestions = async () => {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            try {
                const response = await axios.get(`${apiUrl}/kb/bookmarks`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookmarkedQuestions(response.data.bookmarked);
            } catch (error) {
                console.error('Error fetching bookmarked questions:', error);
            }
        };

        fetchBookmarkedQuestions();
    }, [token]); // Dependency array includes token to refetch if it changes

    useEffect(() => {
        const fetchGradeLevels = async () => {
            // Fetch grade levels from the backend
            const gradeLevelsResponse = await axios.get(`${apiUrl}/api/unique-grade-levels`);
            setGradeLevels(gradeLevelsResponse.data);
        };
    
        const fetchPlays = async () => {
            // Fetch plays from the backend
            const playsResponse = await axios.get(`${apiUrl}/api/plays`);
            setPlays(playsResponse.data);
        };
    
        fetchGradeLevels();
        fetchPlays();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTest({ ...test, [name]: value });
    };

    const handleAddQuestion = (questionId) => {
        setTest(prevTest => ({
            ...prevTest,
            questions: [...prevTest.questions, questionId],
        }));
    };

    const handleRemoveQuestion = (questionId) => {
        setTest(prevTest => ({
            ...prevTest,
            questions: prevTest.questions.filter(id => id !== questionId),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing errors
        try {
            // Calculate the number of questions before sending the data
            const amountOfQuestions = test.questions.length;
    
            const testToSubmit = {
                ...test,
                gradeLevel: selectedGradeLevel,
                topicOfQuestions: selectedTopic,
                amountOfQuestions: amountOfQuestions, // Include the calculated amount of questions
            };
    
            const response = await axios.post(`${apiUrl}/api/tests`, testToSubmit, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            //send notification
            console.log("Just before");
            await createNotification("Test Created Successfully", token);
            console.log("Just after");

            console.log('Test created successfully:', token);
    
            // Reset the form state after successful submission
            setTest({
                title: '',
                subject: '',
                questions: [],
                amountOfQuestions: 0, // Reset to 0 for new test creation
                topicOfQuestions: '',
                gradeLevel: '',
                createdBy: userData._id,
                dateCreated: new Date().toISOString(),
                userRole: userData.role,
            });
            setSelectedGradeLevel('');
            setSelectedTopic('');
            setRandomQuestionsCount('');
        } catch (error) {
            console.error('Error submitting test:', error);
            setError('Failed to create the test. Please try again.');
        }
    };
    
    const handleRandomQuestions = () => {
        // Convert the input value to a number and guard against non-numeric inputs
        const count = parseInt(randomQuestionsCount, 10);
        if (isNaN(count) || count < 1 || count > bookmarkedQuestions.length) {
            setError('Please enter a valid number of questions to add.');
            return;
        }
        
        // Shuffle the array of bookmarked questions and select the first 'count' questions
        const shuffledQuestions = [...bookmarkedQuestions].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, count).map(q => q._id);
        
        // Add the randomly selected questions to the test
        setTest(prevTest => ({
            ...prevTest,
            questions: [...new Set([...prevTest.questions, ...selectedQuestions])] // Use a Set to avoid duplicates
        }));
    };

    console.log('Bookmarked questions:', bookmarkedQuestions);
    
    return (
        <div className="create-test-container">
        <div className="create-test-wrapper">
            <h2 className="create-test-title">Create Test</h2>
            {error && <div className="create-test-error">{error}</div>} {/* Display any error that occurs */}
            
            <div className="create-test-dropdowns">
                <div className="create-test-dropdown">
                    <label htmlFor="gradeLevel" className="create-test-label">Grade Level</label>
                    <select name="gradeLevel" id="gradeLevel" value={selectedGradeLevel} onChange={(e) => setSelectedGradeLevel(e.target.value)} className="create-test-select">
                        <option value="">Select Grade Level</option>
                        {gradeLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
    
                <div className="create-test-dropdown">
                    <label htmlFor="topicOfQuestions" className="create-test-label">Topic</label>
                    <select name="topicOfQuestions" id="topicOfQuestions" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="create-test-select">
                        <option value="">Select Topic</option>
                        {plays.map((play) => (
                            <option key={play._id} value={play._id}>{play.name}</option>
                        ))}
                    </select>
                </div>
            </div>
    
            <form onSubmit={handleSubmit} className="create-test-form">
                {/* Input fields for creating a test */}
                <div className="create-test-input-group">
                    <label htmlFor="title" className="create-test-label">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title" value={test.title} onChange={handleChange} className="create-test-input" />
                </div>
    
                <div className="create-test-input-group">
                    <label htmlFor="subject" className="create-test-label">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="Subject" value={test.subject} onChange={handleChange} className="create-test-input" />
                </div>

                <div className="create-test-random-selection">
                    <label htmlFor="randomQuestionsCount" className="create-test-label">
                        Number of random questions to add:
                    </label>
                    <input
                        type="number"
                        id="randomQuestionsCount"
                        name="randomQuestionsCount"
                        value={randomQuestionsCount}
                        onChange={(e) => setRandomQuestionsCount(e.target.value)}
                        className="create-test-input"
                        min="0"
                    />
                    <button type="button" onClick={handleRandomQuestions} className="create-test-random-button">
                        Add Random Questions
                    </button>
                </div>
    
                {/* Display user data in read-only inputs */}
                <div className="create-test-input-group">
                    <input type="text" readOnly value={`User ID: ${userData._id}`} className="create-test-input-readonly" />
                    <input type="text" readOnly value={`Role: ${userData.role}`} className="create-test-input-readonly" />
                    <input type="text" readOnly value={`Date Created: ${new Date(test.dateCreated).toLocaleDateString()}`} className="create-test-input-readonly" />
                </div>
    
                {/* Submit button */}
                <button type="submit" className="create-test-submit">Create Test</button>
            </form>
    
            <div className="create-test-bookmarked-questions">
                <h3 className="create-test-subtitle">Bookmarked Questions</h3>
                <div className="create-test-questions-list">
                    {bookmarkedQuestions.map((question) => (
                        <div key={question._id} className="create-test-question-item">
                            <p className="create-test-question-text">{question.question}</p>
                            {test.questions.includes(question._id) ? (
                                <button onClick={() => handleRemoveQuestion(question._id)} className="create-test-question-remove">Remove from Test</button>
                            ) : (
                                <button onClick={() => handleAddQuestion(question._id)} className="create-test-question-add">Add to Test</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <div className="create-test-preview">
                <h3>Test Preview</h3>
                <p><strong>Title:</strong> {test.title}</p>
                <p><strong>Subject:</strong> {test.subject}</p>
                <p><strong>Grade Level:</strong> {selectedGradeLevel}</p>
                <p><strong>Topic of Questions:</strong> {plays.find(play => play._id === selectedTopic)?.name || 'N/A'}</p>
                <p><strong>Questions:</strong></p>
                {test.questions.map(qId => {
                    const question = bookmarkedQuestions.find(q => q._id === qId);
                    if (question) {
                    return (
                        <article key={qId} className="kb-question-container">
                        <header className="kb-question-header">
                            <h3>{question.question}</h3>
                        </header>
                        <div className="kb-answer">
                            {question.questionType === 'multipleChoice' && question.option && question.option.length ? (
                            <ul>
                                {question.option.map((option, index) => (
                                <li key={index}>
                                    <label>
                                    <input type="radio" name={`question_${qId}`} value={option} disabled /> {option}
                                    </label>
                                </li>
                                ))}
                            </ul>
                            ) : question.questionType === 'trueFalse' ? (
                            <ul>
                                <li>
                                <label>
                                    <input type="radio" name={`question_${qId}`} value="True" disabled /> True
                                </label>
                                </li>
                                <li>
                                <label>
                                    <input type="radio" name={`question_${qId}`} value="False" disabled /> False
                                </label>
                                </li>
                            </ul>
                            ) : (
                            <input type="text" placeholder="Your answer here" disabled />
                            )}
                        </div>
                        </article>
                    );
                    } else {
                    return <p key={qId}>Question not found</p>;
                    }
                })}
                </div>
        </div>
    );
}

export default CreateTest;



