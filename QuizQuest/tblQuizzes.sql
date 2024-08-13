CREATE TABLE [dbo].[QuizNames]
(
  [Id] INT NOT NULL PRIMARY KEY,
  [Title] VARCHAR(1000) UNIQUE NOT NULL,
  [Category] VARCHAR NOT NULL,
  [Description] VARCHAR(500),
  [ImageUrl] VARCHAR(255)
)
