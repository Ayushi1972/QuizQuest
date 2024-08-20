import React from 'react';
import './MultipleChoiceQuestion.css';

function MultipleChoiceQuestion({ question, onChange, selectedAnswer }) {
  return (
    <div className="multiple-choice-question">
      <h2>{question.questionText}</h2>
      <div className="options">
        {question.answers.map((answer, index) => (
          <label
            key={index}
            className={answer.text === selectedAnswer ? 'selected-option' : ''}
          >
            <input
              type="radio"
              name={`question-${question.questionId}`}
              value={answer.text}
              checked={answer.text === selectedAnswer}
              onChange={() => onChange(question.questionId, answer.text)}
            />
            {answer.text}
          </label>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoiceQuestion;