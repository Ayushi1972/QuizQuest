import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import './Navbar.css';

function Navbar() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use jQuery to fetch quizzes
    $.ajax({
      url: 'http://localhost:3001/api/quizzes', // Fetches all quizzes
      method: 'GET',
      success: (data) => {
        setQuizzes(data);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error('Error fetching quizzes:', textStatus, errorThrown);
      }
    });
  }, []);

  const chooseRandomQuiz = () => {
    if (quizzes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quizzes.length);
      const randomQuiz = quizzes[randomIndex];
      navigate(`/quiz/${encodeURIComponent(randomQuiz.Title)}`);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">QuizQuest</h1>
      <ul>
        <li><Link to="/pages/Home">Home</Link></li>
        <li><Link to="/pages/About">About</Link></li>
        <li><Link to="/pages/Categories">Categories</Link></li>
        <li><Link to="/pages/Create">Create Your Own Quiz</Link></li>
        <li>
          <button onClick={chooseRandomQuiz}>Random Quiz</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;