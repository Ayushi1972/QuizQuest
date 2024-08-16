import React from 'react';
import './MultipleChoiceQuestion.css';

function MultipleChoiceQuestion({ question, onChange }) {
  return (
    <div className="multiple-choice-question">
      <h2>{question.questionText}</h2>
      <div className="options">
        {question.answers.map((answer, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question-${question.questionId}`}
              value={answer.text}
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