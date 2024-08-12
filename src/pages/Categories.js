// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState(['Music', 'History', 'Science', 'Pop Culture', 'Sports', 'Geography']);
  const [sortOrder, setSortOrder] = useState('default');

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    let sortedCategories;
    if (order === 'ascending') {
      sortedCategories = [...categories].sort();
    } else if (order === 'descending') {
      sortedCategories = [...categories].sort().reverse();
    } else {
      sortedCategories = ['Music', 'History', 'Science', 'Pop Culture', 'Sports', 'Geography'];
    }
    setCategories(sortedCategories);
  };

  return (
    <div className="categories">

      <div id="sort-dropdown">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="ascending">Alphabetically A-Z</option>
          <option value="descending">Alphabetically Z-A</option>
        </select>
      </div>

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
