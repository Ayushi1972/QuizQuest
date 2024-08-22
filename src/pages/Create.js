import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import './Create.css';

const ItemTypes = {
  QUESTION: 'question',
};

function CreateQuiz() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [questions, setQuestions] = useState([{ id: 1, question: '', answer: '', hint: '', imageUrl: '' }]);

  const onSubmit = (data) => {
    if (questions.length === 0) {
      toast.error("Must have at least 1 question");
      return;
    }
    toast.success('Form submitted successfully!');
  };

  const addQuestion = () => {
    const newQuestion = { id: questions.length + 1, question: '', answer: '', hint: '', imageUrl: '' };
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
              {...register('category', { required: 'Please select a category' })}
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
            {errors.category && <div className="error">{errors.category.message}</div>}
          </div>

          <div>
            <label htmlFor="timer">Set Timer (minutes):</label>
            <Controller
              name="timer"
              control={control}
              defaultValue="5"
              render={({ field }) => (
                <select {...field}>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option value={i} key={i}>{i}</option>
                  ))}
                </select>
              )}
            />
          </div>

          {questions.map((q, index) => (
            <Question
              key={q.id}
              index={index}
              id={q.id}
              question={q}
              moveQuestion={moveQuestion}
              handleQuestionChange={handleQuestionChange}
              deleteQuestion={deleteQuestion}
              errors={errors}
            />
          ))}

          <button type="button" id="addQuestion" onClick={addQuestion}>+ Add Question</button>
        </div>
        <button type="submit">Create Quiz</button>
      </form>
      <ToastContainer />
    </DndProvider>
  );
}

function Question({ id, index, question, moveQuestion, handleQuestionChange, deleteQuestion, errors }) {
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