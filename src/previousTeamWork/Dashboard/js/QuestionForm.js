import React, { useState, useEffect } from 'react';
import axios from 'axios';
import createNotification from '../../../notificationAPI'
import '../css/QuestionForm.css';

function QuestionForm({ token }) { // Assume token is passed as a prop for user identification
    const initialState = {
        question: '',
        option: ['', ''],
        answer: '',
        questionType: '',
        playId: '',
        act: '',
        scene: '',
        gradeLevel: '', // Added for selecting grade level
    };

    const [questionData, setQuestionData] = useState(initialState);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [userData, setUserData] = useState({ _id: '', role: '', dateJoined: '' }); // Add user data state

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_API_URL}/api/userInfo`;
                const response = await axios.get(apiUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData({ id: response.data._id, role: response.data.role, dateJoined: new Date(response.data.dateJoined).toLocaleDateString() }); 
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        // Fetch grade levels (existing logic)
        const fetchGradeLevels = async () => {
            setGradeLevels(['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']);
        };
        fetchGradeLevels();
    }, [token]);

    // Handler for form input changes, including the dropdown
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('option')) {
            const index = parseInt(name.replace('option', ''), 10);
            const newOptions = [...questionData.option];
            newOptions[index] = value;
            setQuestionData({ ...questionData, option: newOptions });
        } else {
            setQuestionData({ ...questionData, [name]: value });
        }
    };

    // Add another option field
    const handleAddOption = () => {
        setQuestionData({ ...questionData, option: [...questionData.option, ''] });
    };

    const handleRemoveOption = (index) => {
        if (questionData.option.length > 1) {
            setQuestionData(prevState => ({
                ...prevState,
                option: prevState.option.filter((_, idx) => idx !== index),
            }));
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/questions`;
            console.log('Sending question data:', questionData);
            const response = await axios.post(apiUrl, questionData, {
                headers: { Authorization: `Bearer ${token}` }, // Make sure `token` is the actual token
            });
            await createNotification("Question Create", token);
            console.log('Question created:', response.data);
            setQuestionData(initialState);
            setConfirmationMessage('Question created successfully!');
            setSuccess(true);
        } catch (error) {
            console.error('Error creating question:', error);
            setConfirmationMessage('Failed to create question. Please try again.');
            console.error('Error creating question:', error.response ? error.response.data : error);
            setSuccess(false);
        } finally {
            setTimeout(() => setConfirmationMessage(''), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="question-form">
            <h2 className="question-form-title">Create Question</h2>

            {/* Display User Data */}
            <div className="user-data-display">
                <input type="text" readOnly value={`User ID: ${userData.id}`} />
                <input type="text" readOnly value={`Role: ${userData.role}`} />
                <input type="text" readOnly value={`Date Joined: ${userData.dateJoined}`} />
            </div>

            <div className="question-form-group">
                <label className="question-form-label">
                    Question:
                    <input
                        type="text"
                        name="question"
                        className="question-form-input"
                        value={questionData.question}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="question-form-group">
                <label className="question-form-label">
                    Grade Level:
                    <select
                        name="gradeLevel"
                        className="question-form-select"
                        value={questionData.gradeLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Grade Level</option>
                        {gradeLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </label>
            </div>

            {questionData.questionType === 'multipleChoice' && (
                <div className="question-form-group">
                    <label className="question-form-label">Options:</label>
                    {questionData.option.map((option, index) => (
                        <div key={index} className="question-form-option-group">
                            <input
                                type="text"
                                name={`option${index}`}
                                className="question-form-option-input"
                                value={option}
                                onChange={handleChange}
                            />
                            {questionData.option.length > 1 && (
                                <button
                                    type="button"
                                    className="question-form-option-remove"
                                    onClick={() => handleRemoveOption(index)}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="question-form-button" onClick={handleAddOption}>
                        Add Option
                    </button>
                </div>
            )}

            <div className="question-form-group">
                <label className="question-form-label">
                    Answer:
                    {questionData.questionType === 'trueFalse' ? (
                        <label className="switch">
                            <input
                                type="checkbox"
                                name="answer"
                                checked={questionData.answer === 'true'}
                                onChange={(e) => setQuestionData({ ...questionData, answer: e.target.checked ? 'true' : 'false' })}
                            />
                            <span className="slider round"></span>
                        </label>
                    ) : (
                        <input
                            type="text"
                            name="answer"
                            className="question-form-input"
                            value={questionData.answer}
                            onChange={handleChange}
                        />
                    )}
                </label>
            </div>

            <div className="question-form-group">
                <label className="question-form-label">
                    Question Type:
                    <select 
                        name="questionType" 
                        className="question-form-select"
                        value={questionData.questionType} 
                        onChange={handleChange}
                    >
                        <option value="">Select a type</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="trueFalse">True/False</option>
                        <option value="shortAnswer">Short Answer</option>
                    </select>
                </label>
            </div>
            <div className="question-form-group">
                <label className="question-form-label">
                    Play ID:
                    <input
                        type="text"
                        name="playId"
                        className="question-form-input"
                        value={questionData.playId}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="question-form-group">
                <label className="question-form-label">
                    Act:
                    <input
                        type="number"
                        name="act"
                        className="question-form-input"
                        value={questionData.act}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="question-form-group">
                <label className="question-form-label">
                    Scene:
                    <input
                        type="number"
                        name="scene"
                        className="question-form-input"
                        value={questionData.scene}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="question-form-actions">
                <button type="submit" className="question-form-submit">Create Question</button>
            </div>
            {confirmationMessage && (
                <div className={`question-form-confirmation ${success ? 'success' : 'error'}`}>
                    {confirmationMessage}
                </div>
            )}
        </form>
    );
    
}

export default QuestionForm;


