-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql3.freesqldatabase.com
-- Generation Time: Aug 28, 2024 at 02:07 AM
-- Server version: 5.5.54-0ubuntu0.12.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql3728185`
--
CREATE DATABASE IF NOT EXISTS `sql3728185` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sql3728185`;

-- --------------------------------------------------------

--
-- Table structure for table `tblAnswers`
--

DROP TABLE IF EXISTS `tblAnswers`;
CREATE TABLE `tblAnswers` (
  `Id` int(11) NOT NULL,
  `QuestionId` int(11) NOT NULL,
  `AnswerText` varchar(500) NOT NULL,
  `IsCorrect` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblAnswers`
--

INSERT INTO `tblAnswers` (`Id`, `QuestionId`, `AnswerText`, `IsCorrect`) VALUES
(3, 1, 'Taylor Swift', b'1'),
(4, 1, 'Drake', b'0'),
(5, 1, 'SZA', b'0'),
(6, 1, 'Olivia Rodrigo', b'0'),
(7, 2, 'Drake', b'1'),
(8, 2, 'Taylor Swift', b'0'),
(9, 2, 'SZA', b'0'),
(10, 2, 'Olivia Rodrigo', b'0'),
(11, 3, 'The Weekend', b'1'),
(12, 3, 'Taylor Swift', b'0'),
(13, 3, 'SZA', b'0'),
(14, 3, 'Olivia Rodrigo', b'0'),
(15, 4, 'Dua Lipa', b'1'),
(16, 4, 'Taylor Swift', b'0'),
(17, 4, 'SZA', b'0'),
(18, 4, 'Olivia Rodrigo', b'0'),
(19, 5, 'Harry Styles', b'1'),
(20, 5, 'Naill Horan', b'0'),
(21, 5, 'Laim Payne', b'0'),
(22, 5, 'Zayn Malik', b'0'),
(23, 6, 'Blinding Lights', b'1'),
(24, 7, 'Save Your Tears', b'1'),
(25, 8, 'Kill Bill', b'1'),
(26, 9, 'Calm Down', b'1'),
(32, 10, 'Leonardo DiCaprio', b'1'),
(33, 11, 'Robert Downey Jr.', b'1'),
(34, 12, 'Tom Cruise', b'1'),
(35, 13, 'Tom Hanks', b'1'),
(36, 14, 'Brad Pitt', b'1'),
(107, 45, '4', b'0'),
(108, 45, '5', b'1'),
(109, 45, '6', b'0'),
(110, 45, '7', b'0'),
(111, 46, '10', b'1'),
(112, 46, '9', b'0'),
(113, 46, '12', b'0'),
(114, 46, '11', b'0'),
(115, 47, '1', b'0'),
(116, 47, '2', b'0'),
(117, 47, '3', b'1'),
(118, 47, '4', b'0'),
(119, 48, 'Miami Heat', b'0'),
(120, 48, 'Los Angeles Lakers', b'1'),
(121, 48, 'Golden State Warriors', b'0'),
(122, 48, 'Toronto Raptors', b'0'),
(123, 49, 'Michael Jordan', b'1'),
(124, 49, 'Kobe Bryant', b'0'),
(125, 49, 'LeBron James', b'0'),
(126, 49, 'Shaquille O\'Neal', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `tblCategories`
--

DROP TABLE IF EXISTS `tblCategories`;
CREATE TABLE `tblCategories` (
  `Id` int(11) NOT NULL,
  `CategoryName` varchar(100) NOT NULL,
  `ImageUrl` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblCategories`
--

INSERT INTO `tblCategories` (`Id`, `CategoryName`, `ImageUrl`) VALUES
(1, 'Music', 'src/assets/images/music.jpg'),
(2, 'History', 'src/assets/images/history.jpg'),
(3, 'Geography', 'src/assets/images/geography.jpg'),
(4, 'Sports', 'src/assets/images/sports.jpg'),
(5, 'Science', 'src/assets/images/science.jpg'),
(6, 'Pop Culture', 'src/assets/images/pop-culture.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tblQuestion`
--

DROP TABLE IF EXISTS `tblQuestion`;
CREATE TABLE `tblQuestion` (
  `Id` int(11) NOT NULL,
  `QuizId` int(11) NOT NULL,
  `QuestionText` varchar(500) NOT NULL,
  `Hint` varchar(500) DEFAULT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblQuestion`
--

INSERT INTO `tblQuestion` (`Id`, `QuizId`, `QuestionText`, `Hint`, `ImageUrl`) VALUES
(1, 1, 'Blank Space, Released in 2014', 'Her latest tour was called The Eras Tour', NULL),
(2, 1, 'One Dance, Released in 2016', 'Canadian Rapper', NULL),
(3, 1, 'Blinding Lights, Released in 2019', 'This Canadian artist performed during the Super Bowl halftime show in 2021 and is known for his hit album After Hours.', NULL),
(4, 1, 'Levitating, Released in 2020', 'This British artist is known for her deep, sultry voice and has won several Grammy Awards. She gained fame with hits like \"New Rules.\"', NULL),
(5, 1, 'As It Was, Released in 2022', 'This artist was a member of a famous British boy band before launching a successful solo career. He is also known for his acting roles and distinctive fashion sense.', NULL),
(6, 2, 'Which song by The Weeknd, released in 2019, features a retro 1980s synth-pop sound and became a massive hit worldwide?', 'It topped the charts and features themes of longing and nightlife.', NULL),
(7, 2, 'Which 2020 song by The Weeknd, featuring a remix with Ariana Grande, deals with themes of regret and longing for reconciliation?', 'It became popular for its catchy melody and emotional lyrics.', NULL),
(8, 2, 'Which 2022 song by SZA is named after a famous martial arts film series and explores themes of revenge and heartbreak?', 'It became popular for its unique storytelling and emotional depth.', NULL),
(9, 2, 'What is the name of the 2022 song by Rema and Selena Gomez that blends Afrobeat and pop, encouraging listeners to enjoy life?', 'It talks about calming down and features a collaboration between a Nigerian artist and an American pop star.', NULL),
(10, 6, 'Who played the lead role in Titanic?', 'This actor became a teenage heartthrob in the 1990s and has since starred in numerous films directed by Martin Scorsese.', NULL),
(11, 6, 'Who starred as the lead in Avengers: Endgame?', 'This actor is best known for his role as Iron Man in the Marvel Cinematic Universe.', NULL),
(12, 6, 'Who played the lead role in Mission: Impossible?', 'This actor is known for performing his own stunts and has been a top action star since the 1980s.', NULL),
(13, 6, 'Who is the lead actor in Forrest Gump?', 'This actor is known for his versatile roles and has won multiple Academy Awards, including for Philadelphia and Cast Away.', NULL),
(14, 6, 'Who played the lead role in Fight Club?', 'This actor is a Hollywood heartthrob known for his roles in Thelma & Louise and Once Upon a Time in Hollywood.', NULL),
(45, 31, 'How many players are on the court for one team during a standard basketball game?', 'It\'s the same number of players as a starting lineup.', ''),
(46, 31, 'What is the regulation height of a basketball hoop in feet?', 'It\'s a round number, often used in measurements.', ''),
(47, 31, 'What is the maximum number of points a player can score with a single shot in basketball?', 'It\'s the same as a hat-trick in soccer.', ''),
(48, 31, ' Which team won the NBA Championship in 2020?', 'This team has a famous player known as \"The King.\"', ''),
(49, 31, 'Which player is known as \"The King\" in the NBA?', 'He currently plays for the Los Angeles Lakers.', '');

-- --------------------------------------------------------

--
-- Table structure for table `tblQuizzes`
--

DROP TABLE IF EXISTS `tblQuizzes`;
CREATE TABLE `tblQuizzes` (
  `Id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Category` int(11) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `ImageUrl` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblQuizzes`
--

INSERT INTO `tblQuizzes` (`Id`, `Title`, `Category`, `Description`, `ImageUrl`) VALUES
(1, 'Guess The Artist By Their Song', 1, 'Given the song, can you guess the correct artist', 'src/assets/images/music.jpg'),
(2, 'Guess The Song By The Artist', 1, 'Given the artist, can you guess the correct song', 'src/assets/images/music.jpg'),
(4, 'Guess The Country With 1 Vowel', 3, 'Can you guess the country with exactly 1 vowel in the name?', 'src/assets/images/geography.jpg'),
(5, 'Name the National Cities of the Canadian Provinces', 3, 'Can you name all the national cities in all the Canadian provinces?', 'src/assets/images/geography.jpg'),
(6, 'Name the Lead Actor in the Movie', 6, 'Given the move names, can you name the lead actor?', NULL),
(31, 'Basketball 101', 4, 'How well do you know basketball?', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblAnswers`
--
ALTER TABLE `tblAnswers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `QuestionId` (`QuestionId`);

--
-- Indexes for table `tblCategories`
--
ALTER TABLE `tblCategories`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblQuestion`
--
ALTER TABLE `tblQuestion`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `QuizId` (`QuizId`);

--
-- Indexes for table `tblQuizzes`
--
ALTER TABLE `tblQuizzes`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Title` (`Title`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblAnswers`
--
ALTER TABLE `tblAnswers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;
--
-- AUTO_INCREMENT for table `tblCategories`
--
ALTER TABLE `tblCategories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tblQuestion`
--
ALTER TABLE `tblQuestion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `tblQuizzes`
--
ALTER TABLE `tblQuizzes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblAnswers`
--
ALTER TABLE `tblAnswers`
  ADD CONSTRAINT `tblanswers_ibfk_1` FOREIGN KEY (`QuestionId`) REFERENCES `tblQuestion` (`Id`);

--
-- Constraints for table `tblQuestion`
--
ALTER TABLE `tblQuestion`
  ADD CONSTRAINT `tblquestion_ibfk_1` FOREIGN KEY (`QuizId`) REFERENCES `tblQuizzes` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
