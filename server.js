const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3726623',
    password: '9K8xr4XmJ9', // Replace with your actual password
    database: 'sql3726623', // Correct database name
});
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.get('/api/quizzes', (req, res) => {
    const query = 'SELECT Title, tc.CategoryName AS Category, Description, tc.ImageURL FROM tblQuizzes AS quiz INNER JOIN tblCategories AS tc ON tc.Id = quiz.Category;';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/api/categories', (req, res) => {
    const query = 'SELECT CategoryName, ImageURL FROM tblCategories';
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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});