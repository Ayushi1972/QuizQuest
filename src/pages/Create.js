// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React, { useState } from 'react';
import './Create.css';

function CreateQuiz() {
  const [title, setTitle] = useState('');

  return (
    <form action="mailto:your-email@example.com" method="post" enctype="text/plain">
      <div id="create-form">
        <div>
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

        <div>
          <label for="timer">Set Timer (minutes):</label>
          <select id="timer" name="timer">
            <option value="5">1</option>
            <option value="5">2</option>
            <option value="5">3</option>
            <option value="5">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div id="questionsContainer">
          <div class="question">
            <div>
              <label>Question 1:</label>
              <input type="text" name="question" required />
            </div>
            <div>
              <label>Answer:</label>
              <input type="text" name="answer" required />
            </div>
            <div>
              <label>Hint:</label>
              <input type="text" name="hint" />
            </div>
            <div>
              <label>Image URL:</label>
              <input type="text" name="imageUrl" />
            </div>
          </div>
        </div>
        <button type="button" id="addQuestion">+ Add Question</button>
      </div>
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default CreateQuiz;
