// QuizCard.js
import React from 'react';
import './QuizCard.css';

function QuizCard({ title, image, description, onClick }) {
    return (
        <div className="flip-card" onClick={onClick}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={image} alt={title} />
                    <h3>{title}</h3>
                </div>
                <div className="flip-card-back">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default QuizCard;