// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React, { useState } from 'react';
import './Create.css';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle quiz submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="create-form">
        <label for="quiz-title">Quiz Title</label>
        <input
          type="text"
          id="quiz-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the quiz title"
          aria-required="true"
        />
      </div>
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default CreateQuiz;
