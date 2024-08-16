import React from 'react';
import './TextInputQuestion.css'

function TextInputQuestion({ question, onChange }) {
  return (
    <div class="text-input-question">
      <h2>{question.questionText}</h2>
      <input
        type="text"
        placeholder="Your answer"
        onChange={e => onChange(question.questionId, e.target.value)}
      />
    </div>
  );
}

export default TextInputQuestion;