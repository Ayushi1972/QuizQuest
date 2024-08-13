import React, { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import InputQuestion from './InputQuestion';
import './Quiz.css'

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <MultipleChoiceQuestion
        question="What is the capital of France?"
        options={['Paris', 'London', 'Berlin', 'Madrid']}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
      />
      <InputQuestion
        question="Name a programming language that starts with 'J'."
        value={inputValue}
        onInputChange={setInputValue}
      />
      {/* Add a submit button and logic to handle form submission here */}
      <p>hello</p>
    </div>
  );
};

export default Quiz;