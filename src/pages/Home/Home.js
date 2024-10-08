import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../../components/QuizCard/QuizCard';
import $ from 'jquery';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // Use jQuery AJAX to fetch quizzes
        $.ajax({
            url: 'http://localhost:3001/api/quizzes',
            method: 'GET',
            success: (data) => {
                setQuizzes(data);
                // Use jQuery to animate the quiz cards after they are loaded
                $('#quizzes .quiz-card').hide().fadeIn(1000);
            },
            error: (_jqXHR, textStatus, errorThrown) => {
                console.error('Error fetching quizzes:', textStatus, errorThrown);
            }
        });
    }, []);

    const handleCardClick = (quizTitle) => {
        navigate(`/quiz/${quizTitle}`);
    };

    return (
        <div className="quiz-container">
            <h1>Search a quiz or choose a featured one to begin!</h1>
            <h2>Featured</h2>
            <div id="quizzes">
                {quizzes.map((quiz, index) => (
                    <QuizCard
                        key={index}
                        title={quiz.Title}
                        category={quiz.Category}
                        image={quiz.ImageURL}
                        description={quiz.Description}
                        onClick={() => handleCardClick(quiz.Title)}
                        className="quiz-card"
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;