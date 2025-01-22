import React, { useState } from 'react';
import '../css/TakeTest.css';

const TakeTest = ({ test, onClose }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [gradedQuestions, setGradedQuestions] = useState({});
    const [grade, setGrade] = useState(null);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let score = 0;
        const graded = {};

        test.questions.forEach((question) => {
            const userAnswer = userAnswers[question._id];
            const correctAnswer = question.answer;
            let isCorrect = false;
            
            if (question.questionType === 'trueFalse' || question.questionType === 'multipleChoice') {
                isCorrect = userAnswer === correctAnswer;
            } else if (question.questionType === 'shortAnswer') {
                isCorrect = userAnswer?.toLowerCase() === correctAnswer.toLowerCase();
            }

            if (isCorrect) score++;
            graded[question._id] = isCorrect;
        });

        const finalGrade = (score / test.questions.length) * 100;
        setGrade(finalGrade); // Update the grade state variable
        setGradedQuestions(graded);
        setSubmitted(true);
    };

    const renderQuestion = (question) => {
        const isCorrect = gradedQuestions[question._id];
    
        let questionContent = null;
        switch (question.questionType) {
            case 'trueFalse':
                questionContent = (
                    <>
                        <label>
                            <input
                                type="radio"
                                name={question._id}
                                value="true"
                                onChange={() => handleAnswerChange(question._id, "true")}
                                disabled={submitted}
                            /> True
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={question._id}
                                value="false"
                                onChange={() => handleAnswerChange(question._id, "false")}
                                disabled={submitted}
                            /> False
                        </label>
                    </>
                );
                break;
            case 'shortAnswer':
                questionContent = (
                    <input
                        type="text"
                        name={question._id}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        disabled={submitted}
                    />
                );
                break;
            case 'multipleChoice':
                questionContent = question.option.map((option, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name={question._id}
                            value={option}
                            onChange={() => handleAnswerChange(question._id, option)}
                            disabled={submitted}
                        /> {option}
                    </label>
                ));
                break;
            default:
                questionContent = <p>Question type not supported</p>;
        }
    
        return (
            <div className={`question ${submitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
                {questionContent}
                {submitted && (
                    <span className="feedback-icon">{isCorrect ? '✓' : '✗'}</span>
                )}
            </div>
        );
    };

    return (
        <div className="take-test-wrapper">
            <h2 className="take-test-title">{test.title}</h2>
            <form onSubmit={handleSubmit}>
                {test.questions.map((question, index) => (
                    <div key={index} className="take-test-question-container">
                        <p className="take-test-question-text">
                            <strong>Question {index + 1}:</strong> {question.question}
                        </p>
                        <ul className="take-test-options">
                            {renderQuestion(question)}
                        </ul>
                    </div>
                ))}
                <div className="take-test-button-container">
                    {!submitted && <button type="submit" className="take-test-submit">Submit Answers</button>}
                    <button type="button" onClick={onClose} className="take-test-close">Close</button>
                </div>
                {submitted && (
                    <div className="take-test-grade">
                    Your grade is: {grade.toFixed(2)}% {/* Display the calculated grade */}
                    </div>
                )}
            </form>
        </div>
    );
};

export default TakeTest;

