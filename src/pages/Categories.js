// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

function Categories() {
  const categories = ['Music', 'History', 'Science', 'Pop Culture', 'Sports', 'Geography'];

  return (
    <div className="categories">
      {categories.map(category => (
        <div key={category} className="category-card">
          <Link to={`/quizzes/${category}`} aria-label={`Quizzes about ${category}`}>
            <h2>{category}</h2>
            <img
              src={`../assets/images/${category.toLowerCase()}.jpg`}
              alt={`Illustration representing ${category}`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories;
