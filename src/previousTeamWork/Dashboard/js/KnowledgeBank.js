// src/Dashboard/js/KnowledgeBank.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/KnowledgeBank.css";

function KnowledgeBank({ subject }) {
  // console.log(subject);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlay, setSelectedPlay] = useState("");
  const [categories, setCategories] = useState([]); // This will hold the fetched categories
  useEffect(() => {
    const fetchSubjectContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL; // Ensure this is set correctly
        // Fetch the categories (content) for the given subject
        const response = await axios.get(
          `${apiUrl}/api/subject-content/${encodeURIComponent(subject)}`
        );
        setCategories(response.data); // Update categories with the fetched data
      } catch (error) {
        console.error("Failed to fetch subject content:", error);
      }
    };

    if (subject) {
      fetchSubjectContent();
    }
  }, [subject]);

  // Placeholder content for Knowledge Bank by category
  const data = {
    // categories: [
    //   "Plays",
    //   "Books",
    //   "Essays",
    //   "Writing",
    //   "Resources",
    //   "Grammar",
    //   "Tools",
    // ],
    items: {
      Plays: [
      ],
    },
  };

  // Handle click on a play
  const handlePlayClick = (playTitle) => {
    setSelectedPlay(playTitle);
  };

  // Only show items of the selected category
  const itemsToShow = selectedCategory ? data.items[selectedCategory] : [];

  // If a play is selected, show its questions and answers
  const playQuestionsAndAnswers = selectedPlay
    ? data.items["Plays"].find((play) => play.title === selectedPlay).questions
    : [];

  // Function to render different question types
  const renderQuestionType = (question) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`option${index}`}
                  name={`question${index}`}
                  value={option}
                  checked={option === question.answer} // Check correct answer
                />
                <label
                  htmlFor={`option${index}`}
                  className={option === question.answer ? "correct-answer" : ""} // Apply styling for correct answer
                >
                  {option}
                </label>
              </li>
            ))}
          </ul>
        );
      case "short_answer":
        return (
          <input
            type="text"
            value={question.answer}
            className="correct-answer"
            readOnly // Make the input read-only to prevent editing
          />
        );
      case "true_false":
        return (
          <div>
            {["True", "False"].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option.toLowerCase()}
                  name="truefalse"
                  value={option}
                  checked={option === question.answer} // Check correct answer
                />
                <label
                  htmlFor={option.toLowerCase()}
                  className={option === question.answer ? "correct-answer" : ""} // Apply styling for correct answer
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="knowledge-bank">
      <h2>Knowledge Bank: {subject}</h2>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedPlay(""); // Reset selected play when a new category is selected
            }}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory === "Plays" && (
        <div className="plays-list">
          {itemsToShow.map((play) => (
            <button
              key={play.title}
              className={`play-button ${
                selectedPlay === play.title ? "active" : ""
              }`}
              onClick={() => handlePlayClick(play.title)}
            >
              {play.title}
            </button>
          ))}
        </div>
      )}
      <ul className="items-list">
        {playQuestionsAndAnswers.map((item, index) => (
          <li key={index}>
            <strong>{item.question}</strong>
            <div className="question-content">
              <span className="hover-content">{item.answer}</span>
              <div className="options-hidden">
                {renderQuestionType(item)}
              </div>{" "}
              {/* Render options */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KnowledgeBank;
