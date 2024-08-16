import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/quizzes')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setQuizzes(data);})
            .catch(error => console.error('Error fetching quizzes:', error));
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
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;