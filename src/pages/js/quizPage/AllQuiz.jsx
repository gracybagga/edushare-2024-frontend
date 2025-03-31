import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import scholarship from "../../img/scholarship.png";
import LoadingAndErrorComponent from "../../../GeneralComponents/js/LoadingAndErrorComponent";
import Swal from "sweetalert2";

const AllQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const quizIdArray = location.state?.quizIdArray || [];
  const theme = location.state?.theme || "light"; // Extract theme from location.state
  const courseId = location.state?.courseId || '';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      if (!quizIdArray) {
        setLoading(false);
        setError("No Quizzes available.");
        return;
      }
      try {
        let currUserRole = localStorage.getItem('userRole');
        let token = localStorage.getItem('token');

        if (currUserRole === 'STUDENT' || currUserRole === 'TEACHER') {
          setError("You are not authorized to access these lectures.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.VITE_EDUSHARE_BACKEND_URL}/api/quizzes/quizbycourseid/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch lectures');
        }
        const result = await response.json();
        setQuizzes(result.data);
        if (result.data.length > 0) {
          setSelectedQuiz(quizzes[0]);
        } else {
          setError("No quizzes available.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [courseId]);

  useEffect(() => {
    if (selectedQuiz) {
      const fetchQuizQuestions = async () => {
        let currUserRole = localStorage.getItem('userRole');
        let token = localStorage.getItem('token');
        if (!selectedQuiz || !selectedQuiz.description) {
          Swal.fire({
            icon: 'info',
            title: 'OOPS!',
            text: 'You need to select a quiz from the quiz list.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Got it!',
          });
          return;
        }
        if (currUserRole !== 'STUDENT' || currUserRole !== 'TEACHER') {
          Swal.fire({
            icon: 'info',
            title: 'OOPS!',
            text: 'You are not authorized to access these assignments.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Got it!',
          });
          return;
        }
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(`${process.env.REACT_APP_EDUSHARE_BACKEND_URL}/api/content/quiz/`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              "Accept": "application/json",
            },
            body: JSON.stringify({ topic: selectedQuiz.description })
          });
          if (!response.ok) {
            throw new Error('Lecture note could note be fetched');
          }
          const result = await response.json();
          setQuestions(result.quiz);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchQuizQuestions();
    }
  }, [selectedQuiz]);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  // Theme-based styling
  const isDark = theme === "dark";
  const backgroundStyle = isDark
    ? "linear-gradient(to right, #232526, #414345)" // Dark theme
    : "linear-gradient(to right, #faf8ff, #ebe4ff)"; // Light theme
  const cardClass = isDark ? "bg-dark text-light border-light" : "bg-white text-dark shadow";
  const textMutedClass = isDark ? "text-secondary" : "text-muted";
  const activeQuizClass = (quiz) => (quiz === selectedQuiz ? "bg-primary text-white fw-bold" : "bg-light");

  return (
      <div>
        <LoadingAndErrorComponent loading={loading} error={error}/>

        {!loading && !error && (
            <div style={{background: backgroundStyle, minHeight: "100vh"}}>
              {/* Navbar */}
              <nav
                  className={`navbar navbar-expand-lg ${isDark ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow`}>
                <div className="container-fluid">
                  <img src={scholarship} alt='logo' style={{maxHeight: '35px'}}/>
                  <span className="navbar-brand fw-bold">EduShare</span>
                  <button className="btn btn-outline-primary"
                          onClick={() => navigate('/student-course-dashboard', {state: {courseId}})}>
                    ← Course
                  </button>
                </div>
              </nav>

              {/* Quiz Container */}
              <div className="px-4 py-4">
                <div className="row">
                  {/* Quiz List (1/4) */}
                  <div className="col-md-3">
                    <div className="list-group">
                      {quizzes.map((quiz, index) => (
                          <button
                              key={index}
                              className={`list-group-item list-group-item-action ${activeQuizClass(quiz)}`}
                              onClick={() => handleQuizSelect(quiz)}
                          >
                            {quiz.title}
                          </button>
                      ))}
                    </div>
                  </div>

                  {/* Quiz 3/4 */}
                  <div className="col-md-9 p-4">
                    <div className="d-flex flex-column justify-content-center align-items-center"
                         style={{minHeight: '75vh'}}>
                      <div className={`card p-4 w-100 ${cardClass}`} style={{maxWidth: "600px", borderRadius: "12px"}}>
                        {/* Quiz Header */}
                        <h2 className={`text-center ${isDark ? "text-light" : "text-primary"} mb-3`}>Time for a Quiz
                          😁</h2>

                        {showResult ? (
                            <div className="text-center">
                              <h3>Quiz Completed!</h3>
                              <p className="fs-4">
                                Your Score: <strong>{score} / {questions.length}</strong>
                              </p>
                              <button className="btn btn-primary" onClick={handleTryAgain}>
                                Try Again
                              </button>
                            </div>
                        ) : (
                            <>
                              {/* Progress Indicator */}
                              <div className="d-flex justify-content-between mb-3">
                      <span className="badge bg-info">
                        Question {currentQuestion + 1} / {questions.length}
                      </span>
                                <span
                                    className={textMutedClass}>Remaining: {questions.length - (currentQuestion + 1)}</span>
                              </div>

                              {/* Question */}
                              <h5 className="mb-4">{questions[currentQuestion].question}</h5>

                              {/* Answer Options */}
                              <div className="list-group">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`list-group-item list-group-item-action fw-bold text-center 
                            ${selectedAnswer
                                            ? option === questions[currentQuestion].correct_option
                                                ? "list-group-item-success"
                                                : option === selectedAnswer
                                                    ? "list-group-item-danger"
                                                    : ""
                                            : "hover-effect"
                                        }`}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selectedAnswer}
                                    >
                                      {option}
                                    </button>
                                ))}
                              </div>
                            </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        )}
      </div>
  );
};

export default AllQuiz;


/*
* // Sample quiz data
const quizData = {
  "Quiz 1": [
    {
      question: "What is the capital of France?",
      options: ["Madrid", "Paris", "Berlin", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
      answer: "JavaScript",
    },
  ],
  "Quiz 2": [
    {
      question: "Who developed React?",
      options: ["Google", "Facebook", "Microsoft", "Apple"],
      answer: "Facebook",
    },
    {
      question: "What is the symbol for Hydrogen in the periodic table?",
      options: ["H", "O", "He", "N"],
      answer: "H",
    },
  ],
};
* */