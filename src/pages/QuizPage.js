import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextInputQuestion from '../components/TextInputQuestion';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import './QuizPage.css';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function QuizPage() {
  const { title } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Track if the quiz has been submitted

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/quiz/${encodeURIComponent(title)}`);
        const data = await response.json();

        // Shuffle answers for each question
        const shuffledQuestions = data.questions.map(question => {
          const shuffledAnswers = shuffleArray([...question.answers]);
          return {
            ...question,
            answers: shuffledAnswers,
            correctAnswer: shuffledAnswers.find(answer => answer.isCorrect).text
          };
        });

        setQuizData({ ...data, questions: shuffledQuestions });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [title]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let newFeedback = {};
    let newScore = 0;

    quizData.questions.forEach(question => {
      const userAnswer = answers[question.questionId];

      if (userAnswer === question.correctAnswer) {
        newFeedback[question.questionId] = 'Correct';
        newScore += 1;
      } else {
        newFeedback[question.questionId] = 'Incorrect';
      }
    });

    setFeedback(newFeedback);
    setScore(newScore);
    setSubmitted(true); // Set submitted to true when the quiz is submitted
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div id='all-quiz-page'>
      {submitted && (
        <div className="score" style={{ position: 'absolute', top: '20px', right: '20px' }}>
          Score: {score} / {quizData.questions.length}
        </div>
      )}
      <h1>{quizData.quizTitle} Quiz</h1>
      <p>{quizData.description}</p>
      {quizData.questions.map((question) => (
        <div className='each-question' key={question.questionId}>
          {question.answers.length > 1 ? (
            <MultipleChoiceQuestion
              question={question}
              onChange={handleAnswerChange}
            />
          ) : (
            <TextInputQuestion
              question={question}
              onChange={handleAnswerChange}
            />
          )}
          {submitted && (
            <div className={`feedback ${feedback[question.questionId] === 'Correct' ? 'correct' : 'incorrect'}`}>
              {feedback[question.questionId]}
            </div>
          )}
        </div>
      ))}
      <div id='submit-quiz'>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default QuizPage;