// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React, { useState } from 'react';
import './QuizCard.css'; // Ensure you have the CSS file for styling

function QuizCard({ title, image, description }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={image} alt={title} />
                    <h3>{title}</h3>
                </div>
                <div className="card-back">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default QuizCard;