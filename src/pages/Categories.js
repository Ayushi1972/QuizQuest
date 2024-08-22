import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        // Use jQuery to animate the categories after they are loaded
        $('.category-card').hide().fadeIn(1000);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    let sortedCategories;
    if (order === 'ascending') {
      sortedCategories = [...categories].sort((a, b) => a.CategoryName.localeCompare(b.CategoryName));
    } else if (order === 'descending') {
      sortedCategories = [...categories].sort((a, b) => b.CategoryName.localeCompare(a.CategoryName));
    } else {
      sortedCategories = categories; // Use the default order from the API
    }
    setCategories(sortedCategories);
  };

  return (
    <div className="categories">
      <div id="sort-dropdown">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="ascending">Alphabetically A-Z</option>
          <option value="descending">Alphabetically Z-A</option>
        </select>
      </div>

      {categories.map(category => (
        <div key={category.CategoryName} className="category-card">
          <Link to={`/quizzes/${category.CategoryName}`} aria-label={`Quizzes about ${category.CategoryName}`}>
            <h2>{category.CategoryName}</h2>
            <img
              src={category.ImageURL}
              alt={`Illustration representing ${category.CategoryName}`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories;