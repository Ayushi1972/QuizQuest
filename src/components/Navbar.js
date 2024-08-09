// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle redirection
  const chooseRandomQuiz = () => {
    navigate('/pages/Home'); // Redirect to About page
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
          <button onClick={chooseRandomQuiz}>Random Quiz</button> {/* Corrected onClick */}
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
