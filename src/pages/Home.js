import React from 'react';
import QuizCard from '../components/QuizCard';
import blankSpace1 from '../assets/images/love-story-taylor.jpg';
import './Home.css'

function Home() {
    const quizzes = [
        {
            title: 'Blank Space - Taylor Swift',
            image: blankSpace1,
            description: 'Can you guess lyrics of the famous Taylor Swift Song?',
        },
        {
            title: 'One Dance - Drake',
            image: blankSpace1,
            description: 'Can you guess lyrics of the famous Drake Song?',
        },
        {
            title: 'Love Story - Taylor Swift',
            image: blankSpace1,
            description: 'Can you guess lyrics of the famous Taylor Swift Song?',
        },
        // Add more quizzes as needed
    ];

    return (
        <div className="quiz-container">
            <h1>Search a quiz or choose a featured one to begin!</h1>
            <h2>Featured</h2>
            <div id="quizzes">
                {quizzes.map((quiz, index) => (
                    <QuizCard
                        key={index}
                        title={quiz.title}
                        image={quiz.image}
                        description={quiz.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
