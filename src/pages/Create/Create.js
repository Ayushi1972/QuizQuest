import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import $ from 'jquery';
import './Create.css';

const ItemTypes = {
  QUESTION: 'question',
};

function CreateQuiz() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [questions, setQuestions] = useState([{ id: 1, type: 'multiple-choice', question: '', choices: ['', '', '', ''], correctChoice: 0, hint: '', imageUrl: '' }]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories.');
      });
  }, []);

  const onSubmit = async (data) => {
    if (questions.length === 0) {
      toast.error("Must have at least 1 question");
      return;
    }

    // Check for duplicate choices
    for (let i = 0; i < questions.length; i++) {
      const choices = questions[i].choices;
      const uniqueChoices = new Set(choices);
      if (uniqueChoices.size !== choices.length) {
        toast.error(`Duplicate choices found in question ${i + 1}. Please ensure all options are unique.`);
        return;
      }
    }

    const quizData = {
      ...data,
      category: selectedCategory,
      questions
    };

    try {
      const response = await axios.post('http://localhost:3001/api/quizzes', quizData);
      if (response.status === 200) {
        toast.success('Quiz created successfully!');
        reset();
        setQuestions([{ id: 1, type: 'multiple-choice', question: '', choices: ['', '', '', ''], correctChoice: 0, hint: '', imageUrl: '' }]);
        setSelectedCategory('');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('Failed to create quiz. Please try again.');
    }
  };

  const addQuestion = (type) => {
    const newQuestion = { id: questions.length + 1, type, question: '', choices: ['', '', '', ''], correctChoice: 0, hint: '', imageUrl: '' };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    setTimeout(() => {
      $(`#question-${newQuestion.id}`).hide().fadeIn(1000);
    }, 0);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choices[cIndex] = value;
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const moveQuestion = (dragIndex, hoverIndex) => {
    const draggedQuestion = questions[dragIndex];
    const newQuestions = [...questions];
    newQuestions.splice(dragIndex, 1);
    newQuestions.splice(hoverIndex, 0, draggedQuestion);
    setQuestions(newQuestions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="create-form">
          <div>
            <label htmlFor="quiz-title">Quiz Title</label>
            <input
              type="text"
              id="quiz-title"
              {...register('title', { required: 'Quiz title cannot be empty' })}
              placeholder="Enter the quiz title"
              aria-required="true"
            />
            {errors.title && <div className="error">{errors.title.message}</div>}
          </div>

          <div>
            <label htmlFor="quiz-description">Description</label>
            <textarea
              id="quiz-description"
              {...register('description', { required: 'Quiz description cannot be empty' })}
              placeholder="Enter a brief description of the quiz"
              aria-required="true"
            />
            {errors.description && <div className="error">{errors.description.message}</div>}
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory} // Bind to state
              onChange={(e) => setSelectedCategory(e.target.value)} // Update state on change
              aria-required="true">
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.Id} value={category.Id}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
            {errors.category && <div className="error">{errors.category.message}</div>}
          </div>

          {questions.map((q, index) => (
            <Question
              key={q.id}
              index={index}
              id={q.id}
              question={q}
              moveQuestion={moveQuestion}
              handleQuestionChange={handleQuestionChange}
              handleChoiceChange={handleChoiceChange}
              deleteQuestion={deleteQuestion}
              errors={errors}
            />
          ))}
          <div className='adding-buttons'>
            <button type="button" id="addMultipleChoiceQuestion" onClick={() => addQuestion('multiple-choice')}>+ Add Multiple Choice Question</button>
            <button type="button" id="addInputQuestion" onClick={() => addQuestion('input')}>+ Add Input Question</button>
          </div>
        </div>
        <button type="submit">Create Quiz</button>
      </form>
      <ToastContainer />
    </DndProvider>
  );
}

function Question({ id, index, question, moveQuestion, handleQuestionChange, handleChoiceChange, deleteQuestion, errors }) {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.QUESTION,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUESTION,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} id={`question-${id}`} className="question" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div>
        <label>Question {index + 1}:</label>
        <input
          type="text"
          name="question"
          value={question.question}
          onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
          required
        />
        {errors[`question${index}`] && <div className="error">{errors[`question${index}`]}</div>}
      </div>

      {question.type === 'multiple-choice' ? (
        <div className="choice-grid">
          {question.choices.map((choice, cIndex) => (
            <div key={cIndex}>
              <label>Choice {cIndex + 1}:</label>
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, cIndex, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <label>Answer:</label>
          <input
            type="text"
            name="answer"
            value={question.answer}
            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            required
          />
          {errors[`answer${index}`] && <div className="error">{errors[`answer${index}`]}</div>}
        </div>
      )}

      <div className="row">
        {question.type === 'multiple-choice' && (
          <div>
            <label>Correct Choice:</label>
            <select
              value={question.correctChoice}
              onChange={(e) => handleQuestionChange(index, 'correctChoice', e.target.value)}
            >
              {question.choices.map((_, cIndex) => (
                <option key={cIndex} value={cIndex}>{`Choice ${cIndex + 1}`}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>Hint:</label>
          <input
            type="text"
            name="hint"
            value={question.hint}
            onChange={(e) => handleQuestionChange(index, 'hint', e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={question.imageUrl}
            onChange={(e) => handleQuestionChange(index, 'imageUrl', e.target.value)}
          />
        </div>
      </div>

      <button type="button" onClick={() => deleteQuestion(index)}>Delete</button>
    </div>
  );
}

export default CreateQuiz;