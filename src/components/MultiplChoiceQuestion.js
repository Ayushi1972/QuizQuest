import React from 'react';

const MultipleChoiceQuestion = ({ question, options, selectedOption, onOptionChange }) => {
  return (
    <div>
      <p>{question}</p>
      {options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name={`multiple-choice-${question}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;