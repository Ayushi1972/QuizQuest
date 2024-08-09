// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React from 'react';
import '../components/QuizCard.css';

function QuizCard({ title, image, description }) {
  return (
    <div className="quiz-card">
      <img src={image} alt={title} className="quiz-image" />
      <h3 className="quiz-title">{title}</h3>
      <p className="quiz-description">{description}</p>
    </div>
  );
}

export default QuizCard;