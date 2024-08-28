import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextInputQuestion from '../../components/TextInputQuestion/TextInputQuestion';
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion/MultipleChoiceQuestion';
import ResultModal from '../../components/ResultAnimation/ResultAnimation';
import PadletEmbed from '../../components/Padlet/Padlet'; // Import the PadletEmbed component
import $ from 'jquery';
import './QuizPage.css';

// Function to shuffle an array (used for shuffling quiz answers)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function QuizPage() {
  const { title } = useParams(); // Get the quiz title from the URL parameters
  const [quizData, setQuizData] = useState(null); // State to store quiz data
  const [answers, setAnswers] = useState({}); // State to store user's answers
  const [feedback, setFeedback] = useState({}); // State to store feedback for each question
  const [score, setScore] = useState(0); // State to store the user's score
  const [submitted, setSubmitted] = useState(false); // State to track if the quiz has been submitted
  const [showHints, setShowHints] = useState({}); // State to track which hints are shown
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the result modal
  const [revealAnswers, setRevealAnswers] = useState({}); // State to track revealed answers

  useEffect(() => {
    // Fetch quiz data from the server
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/quiz/${encodeURIComponent(title)}`);
        const data = await response.json();
    
        // Shuffle answers and store the correct answer text
        const shuffledQuestions = data.questions.map(question => {
          const correctAnswerText = question.answers.find(answer => answer.isCorrect).text;
          const shuffledAnswers = shuffleArray([...question.answers]);
          return {
            ...question,
            answers: shuffledAnswers,
            correctAnswer: correctAnswerText
          };
        });
    
        setQuizData({ ...data, questions: shuffledQuestions });
    
        // Use jQuery to fade in the quiz content
        $('#all-quiz-page').hide().fadeIn(1000);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    fetchQuizData();
  }, [title]);

  // Handle answer changes for each question
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // Handle quiz submission
  const handleSubmit = () => {
    let newFeedback = {};
    let newScore = 0;
  
    // Evaluate each question
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
    setSubmitted(true);
    setShowModal(true);
  };

  // Toggle hint visibility
  const toggleHint = (questionId) => {
    setShowHints(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Toggle answer reveal visibility
  const toggleRevealAnswer = (questionId) => {
    setRevealAnswers(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Close the result modal
  const closeModal = () => {
    $('.modal-overlay').fadeOut(500, () => {
      setShowModal(false);
    });
  };

  if (!quizData) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div id='all-quiz-page'>
      {showModal && (
        <ResultModal
          id="result-modal"
          score={score}
          totalQuestions={quizData.questions.length}
          onClose={closeModal}
        />
      )}
      <h1>{quizData.quizTitle} Quiz</h1>
      <p>{quizData.description}</p>
      {quizData.questions.map((question) => (
        <div className='each-question' key={question.questionId}>
          {question.answers.length > 1 ? (
            <MultipleChoiceQuestion
              key={question.questionId}
              question={question}
              onChange={handleAnswerChange}
              selectedAnswer={answers[question.questionId]}
            />
          ) : (
            <TextInputQuestion
              question={question}
              onChange={handleAnswerChange}
            />
          )}
          <button onClick={() => toggleHint(question.questionId)}>
            {showHints[question.questionId] ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHints[question.questionId] && <p className="hint">{question.Hint}</p>}
          {submitted && (
            <>
              <div className={`feedback ${feedback[question.questionId] === 'Correct' ? 'correct' : 'incorrect'}`}>
                {feedback[question.questionId]}
              </div>
              <button onClick={() => toggleRevealAnswer(question.questionId)}>
                {revealAnswers[question.questionId] ? 'Hide Answer' : 'Reveal Answer'}
              </button>
              {revealAnswers[question.questionId] && (
                <p className="correct-answer">Correct Answer: {question.correctAnswer}</p>
              )}
            </>
          )}
        </div>
      ))}
      <div id='submit-quiz'>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
      <PadletEmbed /> {/* Add the PadletEmbed component here */}
    </div>
  );
}

export default QuizPage;