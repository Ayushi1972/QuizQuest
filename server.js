require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.get('/api/quizzes', (req, res) => {
    const category = req.query.category;
    const query = category ? 
        `SELECT Title, tc.CategoryName AS Category, Description, tc.ImageURL FROM tblQuizzes AS quiz ` + 
        `INNER JOIN tblCategories AS tc ON tc.Id = quiz.Category WHERE tc.CategoryName = ?;` : 
        `SELECT Title, tc.CategoryName AS Category, Description, tc.ImageURL FROM tblQuizzes AS quiz ` + 
        `INNER JOIN tblCategories AS tc ON tc.Id = quiz.Category;`;

    db.query(query, category ? [category] : [], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/api/categories', (req, res) => {
    const query = 'SELECT Id, CategoryName, ImageURL FROM tblCategories';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/api/quiz/:title', (req, res) => {
    const { title } = req.params;
    const quizQuery = 'SELECT * FROM tblQuizzes WHERE Title = ?';
    const questionsQuery = `
      SELECT q.Id as questionId, q.QuestionText, a.AnswerText, q.Hint, a.IsCorrect
      FROM tblQuestion q
      JOIN tblAnswers a ON q.Id = a.QuestionId
      WHERE q.QuizId = ?
    `;

    db.query(quizQuery, [title], (err, quizResults) => {
        if (err) return res.status(500).json({ error: err.message });
        if (quizResults.length === 0) return res.status(404).json({ error: 'Quiz not found' });

        const quiz = quizResults[0];
        db.query(questionsQuery, [quiz.Id], (err, questionResults) => {
            if (err) return res.status(500).json({ error: err.message });

            const questions = questionResults.reduce((acc, row) => {
                const question = acc.find(q => q.questionId === row.questionId);
                if (question) {
                    question.answers.push({ text: row.AnswerText, isCorrect: row.IsCorrect });
                } else {
                    acc.push({
                        questionId: row.questionId,
                        questionText: row.QuestionText,
                        Hint: row.Hint,
                        answers: [{ text: row.AnswerText, isCorrect: row.IsCorrect }]
                    });
                }
                return acc;
            }, []);

            res.json({ quizTitle: quiz.Title, description: quiz.Description, questions });
        });
    });
});

app.post('/api/quizzes', (req, res) => {
    const { title, description, category, questions } = req.body;

    // Insert quiz into tblQuizzes
    const quizQuery = 'INSERT INTO tblQuizzes (Title, Category, Description) VALUES (?, ?, ?)';
    db.query(quizQuery, [title, category, description], (err, result) => {
        if (err) {
            console.error('Error inserting quiz:', err);
            return res.status(500).send('Error inserting quiz');
        }

        const quizId = result.insertId;

        // Insert questions into tblQuestion and answers into tblAnswers
        questions.forEach((question) => {
            const questionQuery = 'INSERT INTO tblQuestion (QuizId, QuestionText, Hint, ImageUrl) VALUES (?, ?, ?, ?)';
            db.query(questionQuery, [quizId, question.question, question.hint, question.imageUrl], (err, result) => {
                if (err) {
                    console.error('Error inserting question:', err);
                    return;
                }

                const questionId = result.insertId;

                if (question.type === 'multiple-choice') {
                    // Insert each choice as an answer
                    question.choices.forEach((choice, index) => {
                        const answerQuery = 'INSERT INTO tblAnswers (QuestionId, AnswerText, IsCorrect) VALUES (?, ?, ?)';
                        db.query(answerQuery, [questionId, choice, index === parseInt(question.correctChoice, 10) ? 1 : 0], (err) => {
                            if (err) {
                                console.error('Error inserting answer:', err);
                            }
                        });
                    });
                } else if (question.type === 'input') {
                    // Insert the single correct answer for input questions
                    const answerQuery = 'INSERT INTO tblAnswers (QuestionId, AnswerText, IsCorrect) VALUES (?, ?, ?)';
                    db.query(answerQuery, [questionId, question.answer, 1], (err) => {
                        if (err) {
                            console.error('Error inserting answer:', err);
                        }
                    });
                }
            });
        });

        res.status(200).send('Quiz created successfully');
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});