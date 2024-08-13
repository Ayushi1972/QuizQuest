import React from 'react';

const InputQuestion = ({ question, value, onInputChange }) => {
  return (
    <div>
      <p>{question}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default InputQuestion;