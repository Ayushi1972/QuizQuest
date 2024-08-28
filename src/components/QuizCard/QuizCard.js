import React, { useEffect } from 'react';
import $ from 'jquery';
import './QuizCard.css';
import music from '../../assets/images/music.jpg';
import geography from '../../assets/images/geography.jpg';
import history from '../../assets/images/history.jpg';
import science from '../../assets/images/science.jpg';
import sports from '../../assets/images/sports.jpg';
import popculture from '../../assets/images/pop culture.jpg';

function QuizCard({ title, category, description, onClick }) {
    // Mapping of categories to images
    const categoryImages = {
        Music: music,
        Geography: geography,
        History: history,
        Science: science,
        Sports: sports,
        'Pop Culture': popculture
    };

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

    // Select the image based on the category
    const selectedImage = categoryImages[category] || '';

    return (
        <div className="flip-card" onClick={onClick}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h3 id="category">{category}</h3>
                    <img src={selectedImage} alt={title} />
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