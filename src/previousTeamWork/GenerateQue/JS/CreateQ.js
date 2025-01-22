import React, { useState } from 'react';

function CreateQuestion() {
  const [formData, setFormData] = useState({
    question: '',
    correctAnswer: '',
    act: '',
    scene: '',
    type: 'trueFalse', // Default to 'trueFalse'
    option: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('/your-backend-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          options: formData.type === 'trueFalse' ? undefined : formData.options,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create question');
      }

      alert('Question added successfully');
      // Reset form or redirect as needed
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className="create-question-form">
      <h2>Create a New Question</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input type="text" name="question" value={formData.question} onChange={handleChange} required />
        </div>
        <div>
          <label>Correct Answer:</label>
          <input type="text" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} required />
        </div>
        <div>
          <label>Act:</label>
          <input type="text" name="act" value={formData.act} onChange={handleChange} />
        </div>
        <div>
          <label>Scene:</label>
          <input type="text" name="scene" value={formData.scene} onChange={handleChange} />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="trueFalse">True/False</option>
            <option value="multipleChoice">Multiple Choice</option>
          </select>
        </div>
        {formData.type !== 'trueFalse' && (
          <div>
            <label>Options (comma-separated):</label>
            <input type="text" name="options" value={formData.options} onChange={handleChange} />
          </div>
        )}
        <button type="submit">Submit Question</button>
      </form>
    </div>
  );
}

export default CreateQuestion;
