import React from 'react';
import './MultipleChoiceQuestion.css';

function MultipleChoiceQuestion({ question, onChange, selectedAnswer }) {
  return (
    <div className="multiple-choice-question">
      <h2>{question.questionText}</h2>
      <div className="options" role="radiogroup" aria-labelledby={`question-${question.questionId}`}>
        {question.answers.map((answer, index) => (
          <div key={index} className="option-container">
            <input
              type="radio"
              id={`question-${question.questionId}-option-${index}`}
              name={`question-${question.questionId}`}
              value={answer.text}
              checked={answer.text === selectedAnswer}
              onChange={() => onChange(question.questionId, answer.text)}
              aria-checked={answer.text === selectedAnswer}
              aria-label={answer.text}
            />
            <label
              htmlFor={`question-${question.questionId}-option-${index}`}
              className={`option-label ${answer.text === selectedAnswer ? 'selected-option' : ''}`}
            >
              {answer.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoiceQuestion;