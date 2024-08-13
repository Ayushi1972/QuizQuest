CREATE TABLE [dbo].[tblAnswers]
(
  [Id] INT NOT NULL PRIMARY KEY,
  [QuestionId] INT FOREIGN KEY REFERENCES Questions(Id),
  [AnswerText] VARCHAR(500) NOT NULL,
  [IsCorrect] BIT NOT NULL
)
