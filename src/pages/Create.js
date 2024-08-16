import React, { useState } from 'react';
import './Create.css';

function CreateQuiz() {
  // State to store the quiz title
  const [title, setTitle] = useState('');
  // State to store the quiz description
  const [description, setDescription] = useState('');
  // State to store the selected category
  const [category, setCategory] = useState('');
  // State to store the timer
  const [timer, setTimer] = useState('5');
  // State to store the list of questions
  const [questions, setQuestions] = useState([{ question: '', answer: '', hint: '', imageUrl: '' }]);
  // State to store validation errors
  const [errors, setErrors] = useState({});

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    // Validate quiz title
    if (!title.trim()) {
      newErrors.title = 'Quiz title cannot be empty';
    }

    // Validate quiz description
    if (!description.trim()) {
      newErrors.description = 'Quiz description cannot be empty';
    }

    // Validate category selection
    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (questions.length === 0){
      newErrors.questions = "Must have at least 1 question"
    }

    // Validate each question and answer
    questions.forEach((q, index) => {
      if (!q.question.trim()) {
        newErrors[`question${index}`] = `Question ${index + 1} cannot be empty`;
      }
      if (!q.answer.trim()) {
        newErrors[`answer${index}`] = `Answer for question ${index + 1} cannot be empty`;
      }
    });

    // Update the errors state
    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      // If form is valid, proceed with submission
      alert('Form submitted');
    }
  };

  // Function to handle changes in question input fields
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value; // Update the specific field of the question
    setQuestions(newQuestions); // Update the questions state
  };

  // Function to add a new question to the form
  const addQuestion = () => {
    const newQuestion = { question: '', answer: '', hint: '', imageUrl: '' }; // New question template
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]); // Add new question to the list
  };

  // Function to delete a question from the form
  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index); // Remove the question at the specified index
    setQuestions(newQuestions); // Update the questions state with the new array
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="create-form">
        <div>
          <label htmlFor="quiz-title">Quiz Title</label>
          <input
            type="text"
            id="quiz-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on change
            placeholder="Enter the quiz title"
            aria-required="true"
          />
          {errors.title && <div className="error">{errors.title}</div>} {/* Display title error if any */}
        </div>

        <div>
          <label htmlFor="quiz-description">Description</label>
          <textarea
            id="quiz-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on change
            placeholder="Enter a brief description of the quiz"
            aria-required="true"
          />
          {errors.description && <div className="error">{errors.description}</div>} {/* Display description error if any */}
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Update category state on change
            aria-required="true"
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="history">History</option>
            <option value="science">Science</option>
            <option value="pop-culture">Pop Culture</option>
            <option value="sports">Sports</option>
            <option value="geography">Geography</option>
          </select>
          {errors.category && <div className="error">{errors.category}</div>} {/* Display category error if any */}
        </div>

        <div>
          <label htmlFor="timer">Set Timer (minutes):</label>
          <select
            id="timer"
            name="timer"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}>
            {
              Array.from({ length: 21 }, (_, i) => (
                <option value={i} key={i}>{i}</option>
              ))
            }
          </select>
        </div>

        <div id="questionsContainer">
          {questions.map((q, index) => (
            <div className="question" key={index}>
              <div>
                <label>Question {index + 1}:</label>
                <input
                  type="text"
                  name="question"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} // Update question text
                  required
                />
                {errors[`question${index}`] && <div className="error">{errors[`question${index}`]}</div>} {/* Display question error if any */}
              </div>
              <div>
                <label>Answer:</label>
                <input
                  type="text"
                  name="answer"
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)} // Update answer text
                  required
                />
                {errors[`answer${index}`] && <div className="error">{errors[`answer${index}`]}</div>} {/* Display answer error if any */}
              </div>
              <div>
                <label>Hint:</label>
                <input
                  type="text"
                  name="hint"
                  value={q.hint}
                  onChange={(e) => handleQuestionChange(index, 'hint', e.target.value)} // Update hint text
                />
              </div>
              <div>
                <label>Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={q.imageUrl}
                  onChange={(e) => handleQuestionChange(index, 'imageUrl', e.target.value)} // Update image URL
                />
              </div>
              <button type="button" onClick={() => deleteQuestion(index)}>Delete</button> {/* Button to delete the question */}
            </div>
          ))}
        </div>

        <button type="button" id="addQuestion" onClick={addQuestion}>+ Add Question</button> {/* Button to add new question */}
      </div>
      <button type="submit">Create Quiz</button> {/* Submit button for the form */}
    </form>
  );
}

export default CreateQuiz;