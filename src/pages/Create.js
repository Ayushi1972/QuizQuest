// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React, { useState } from 'react';
import './Create.css';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [timer, setTimer] = useState('') // useState to store timer
  const [question1, setQuestion] = useState('') // useState to store Last Name
  const [answer1, setAnswer] = useState('') // useState to store Mobile Number
  const [hint1, setHint] = useState('') // useState to store Age
  const [img, setImage] = useState('') // useState to store Email address of the user
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (title.length == 0){
      newErrors.title = 'Title can not be empty';
    }
    if (question1.length == 0){
      newErrors.question1 = 'Question can not be empty';
    }
    if (answer1.length == 0){
      newErrors.question1 = 'Answer can not be empty';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert('Form is valid');
    }
  }

  return (
    <form action="mailto:your-email@example.com" method="post" enctype="text/plain"
        onSubmit={(e) => { e.preventDefault(); validateForm(); }}>
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
          <select id="timer" 
            name="timer"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}>
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
              <input type="text" 
                name="question" 
                value={question1}
                onChange={(e) => setQuestion(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Answer:</label>
              <input type="text" 
              name="answer" 
              value={answer1}
              onChange={(e) => setAnswer(e.target.value)} required />
            </div>
            <div>
              <label>Hint:</label>
              <input type="text" 
              name="hint" 
              value={hint1}
              onChange={(e) => setHint(e.target.value)} />
            </div>
            <div>
              <label>Image URL:</label>
              <input type="text" 
              name="imageUrl"
              value={img}
              onChange={(e) => setImage(e.target.value)}  />
            </div>
          </div>
        </div>
        <button type="button" id="addQuestion">+ Add Question</button>
      </div>
      <button type="submit" >Create Quiz</button>
    </form>
  );
}



export default CreateQuiz;
