// QuizPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuizPage.css';

function QuizPage() {
  const { title } = useParams();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data.data))
      .catch(error => console.error(error));
  }, []);


  return (
    <div>
      <h1>{title} Quiz</h1>
      
    </div>
  );
}

export default QuizPage;