import React, { useEffect } from 'react';
import $ from 'jquery';
import './QuizCard.css';

function QuizCard({ title, category, image, description, onClick }) {
    useEffect(() => {
        // Apply jQuery flip animation
        $('.flip-card').on('click', function() {
            $(this).find('.flip-card-inner').toggleClass('flipped');
        });

        // Clean up the event listener on unmount
        return () => {
            $('.flip-card').off('click');
        };
    }, []);

    return (
        <div className="flip-card" onClick={onClick}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h3 id="category">{category}</h3>
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