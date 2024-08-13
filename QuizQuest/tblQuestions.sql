CREATE TABLE [dbo].[Question]
(
  [Id] INT NOT NULL PRIMARY KEY,
  [QuizId] INT FOREIGN KEY REFERENCES Quizzes[Id],
  [QuestionText] VARCHAR(500) NOT NULL,
  [Hint] VARCHAR(500),
  [ImageUrl] VARCHAR(255)
)
