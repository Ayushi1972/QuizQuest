import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const url = selectedCategory
          ? `http://localhost:3001/api/quizzes?category=${encodeURIComponent(selectedCategory)}`
          : 'http://localhost:3001/api/quizzes';
        
        const response = await fetch(url);
        const data = await response.json();
        setQuizzes(data);
        // Use jQuery to animate the quizzes after they are loaded
        $('.quiz-card').hide().fadeIn(1000);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [selectedCategory]);

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

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleQuizClick = (quizTitle) => {
    navigate(`/quiz/${encodeURIComponent(quizTitle)}`);
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

      <div className="category-list">
        {categories.map(category => (
          <div key={category.CategoryName} className="category-card" onClick={() => handleCategoryClick(category.CategoryName)}>
            <h2>{category.CategoryName}</h2>
            <img
              src={category.ImageURL}
              alt={`Illustration representing ${category.CategoryName}`}
            />
          </div>
        ))}
      </div>

      <div className="quizzes">
        <h3>{selectedCategory ? `Quizzes in ${selectedCategory}` : 'All Quizzes'}</h3>
        {quizzes.map(quiz => (
          <button key={quiz.Title} className="quiz-card" onClick={() => handleQuizClick(quiz.Title)}>
            <h4>{quiz.Title}</h4>
            <p>{quiz.Description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;