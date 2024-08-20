import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './Create.css';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [timer, setTimer] = useState('5');
  const [questions, setQuestions] = useState([{ question: '', answer: '', hint: '', imageUrl: '' }]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Quiz title cannot be empty';
    if (!description.trim()) newErrors.description = 'Quiz description cannot be empty';
    if (!category) newErrors.category = 'Please select a category';
    if (questions.length === 0) newErrors.questions = "Must have at least 1 question";

    questions.forEach((q, index) => {
      if (!q.question.trim()) newErrors[`question${index}`] = `Question ${index + 1} cannot be empty`;
      if (!q.answer.trim()) newErrors[`answer${index}`] = `Answer for question ${index + 1} cannot be empty`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert('Form submitted');
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    const newQuestion = { question: '', answer: '', hint: '', imageUrl: '' };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="create-form">
        <div>
          <label htmlFor="quiz-title">Quiz Title</label>
          <input
            type="text"
            id="quiz-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the quiz title"
            aria-required="true"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div>
          <label htmlFor="quiz-description">Description</label>
          <textarea
            id="quiz-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description of the quiz"
            aria-required="true"
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-required="true"
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="history">History</option>
            <option value="science">Science</option>
            <option value="pop-culture">Pop Culture</option>
            <option value="sports">Sports</option>
            <option value="geography">Geography</option>
          </select>
          {errors.category && <div className="error">{errors.category}</div>}
        </div>

        <div>
          <label htmlFor="timer">Set Timer (minutes):</label>
          <select
            id="timer"
            name="timer"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}>
            {
              Array.from({ length: 21 }, (_, i) => (
                <option value={i} key={i}>{i}</option>
              ))
            }
          </select>
        </div>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={questions} strategy={verticalListSortingStrategy}>
            {questions.map((q, index) => (
              <SortableItem key={index} id={index} question={q} index={index} handleQuestionChange={handleQuestionChange} deleteQuestion={deleteQuestion} errors={errors} />
            ))}
          </SortableContext>
        </DndContext>

        <button type="button" id="addQuestion" onClick={addQuestion}>+ Add Question</button>
      </div>
      <button type="submit">Create Quiz</button>
    </form>
  );
}

function SortableItem({ id, question, index, handleQuestionChange, deleteQuestion, errors }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="question" ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
      <button type="button" onClick={() => deleteQuestion(index)}>Delete</button>
    </div>
  );
}

export default CreateQuiz;