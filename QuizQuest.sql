-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: QuizQuest
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblAnswers`
--

DROP TABLE IF EXISTS `tblAnswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblAnswers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `QuestionId` int NOT NULL,
  `AnswerText` varchar(500) NOT NULL,
  `IsCorrect` bit(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `QuestionId` (`QuestionId`),
  CONSTRAINT `tblanswers_ibfk_1` FOREIGN KEY (`QuestionId`) REFERENCES `tblQuestion` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAnswers`
--

LOCK TABLES `tblAnswers` WRITE;
/*!40000 ALTER TABLE `tblAnswers` DISABLE KEYS */;
INSERT INTO `tblAnswers` VALUES (3,1,'Taylor Swift',_binary ''),(4,1,'Drake',_binary '\0'),(5,1,'SZA',_binary '\0'),(6,1,'Olivia Rodrigo',_binary '\0'),(7,2,'Drake',_binary ''),(8,2,'Taylor Swift',_binary '\0'),(9,2,'SZA',_binary '\0'),(10,2,'Olivia Rodrigo',_binary '\0'),(11,3,'The Weekend',_binary ''),(12,3,'Taylor Swift',_binary '\0'),(13,3,'SZA',_binary '\0'),(14,3,'Olivia Rodrigo',_binary '\0'),(15,4,'Dua Lipa',_binary ''),(16,4,'Taylor Swift',_binary '\0'),(17,4,'SZA',_binary '\0'),(18,4,'Olivia Rodrigo',_binary '\0'),(19,5,'Harry Styles',_binary ''),(20,5,'Naill Horan',_binary '\0'),(21,5,'Laim Payne',_binary '\0'),(22,5,'Zayn Malik',_binary '\0'),(23,6,'Blinding Lights',_binary ''),(24,7,'Save Your Tears',_binary ''),(25,8,'Kill Bill',_binary ''),(26,9,'Calm Down',_binary ''),(32,10,'Leonardo DiCaprio',_binary ''),(33,11,'Robert Downey Jr.',_binary ''),(34,12,'Tom Cruise',_binary ''),(35,13,'Tom Hanks',_binary ''),(36,14,'Brad Pitt',_binary '');
/*!40000 ALTER TABLE `tblAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCategories`
--

DROP TABLE IF EXISTS `tblCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblCategories` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  `ImageUrl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCategories`
--

LOCK TABLES `tblCategories` WRITE;
/*!40000 ALTER TABLE `tblCategories` DISABLE KEYS */;
INSERT INTO `tblCategories` VALUES (1,'Music','src/assets/images/music.jpg'),(2,'History','src/assets/images/history.jpg'),(3,'Geography','src/assets/images/geography.jpg'),(4,'Sports','src/assets/images/sports.jpg'),(5,'Science','src/assets/images/science.jpg'),(6,'Pop Culture','src/assets/images/pop-culture.jpg');
/*!40000 ALTER TABLE `tblCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblQuestion`
--

DROP TABLE IF EXISTS `tblQuestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblQuestion` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `QuizId` int NOT NULL,
  `QuestionText` varchar(500) NOT NULL,
  `Hint` varchar(500) DEFAULT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `QuizId` (`QuizId`),
  CONSTRAINT `tblquestion_ibfk_1` FOREIGN KEY (`QuizId`) REFERENCES `tblQuizzes` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblQuestion`
--

LOCK TABLES `tblQuestion` WRITE;
/*!40000 ALTER TABLE `tblQuestion` DISABLE KEYS */;
INSERT INTO `tblQuestion` VALUES (1,1,'Blank Space, Released in 2014','Her latest tour was called The Eras Tour',NULL),(2,1,'One Dance, Released in 2016','Canadian Rapper',NULL),(3,1,'Blinding Lights, Released in 2019','This Canadian artist performed during the Super Bowl halftime show in 2021 and is known for his hit album After Hours.',NULL),(4,1,'Levitating, Released in 2020','This British artist is known for her deep, sultry voice and has won several Grammy Awards. She gained fame with hits like \"New Rules.\"',NULL),(5,1,'As It Was, Released in 2022','This artist was a member of a famous British boy band before launching a successful solo career. He is also known for his acting roles and distinctive fashion sense.',NULL),(6,2,'Which song by The Weeknd, released in 2019, features a retro 1980s synth-pop sound and became a massive hit worldwide?','It topped the charts and features themes of longing and nightlife.',NULL),(7,2,'Which 2020 song by The Weeknd, featuring a remix with Ariana Grande, deals with themes of regret and longing for reconciliation?','It became popular for its catchy melody and emotional lyrics.',NULL),(8,2,'Which 2022 song by SZA is named after a famous martial arts film series and explores themes of revenge and heartbreak?','It became popular for its unique storytelling and emotional depth.',NULL),(9,2,'What is the name of the 2022 song by Rema and Selena Gomez that blends Afrobeat and pop, encouraging listeners to enjoy life?','It talks about calming down and features a collaboration between a Nigerian artist and an American pop star.',NULL),(10,6,'Who played the lead role in Titanic?','This actor became a teenage heartthrob in the 1990s and has since starred in numerous films directed by Martin Scorsese.',NULL),(11,6,'Who starred as the lead in Avengers: Endgame?','This actor is best known for his role as Iron Man in the Marvel Cinematic Universe.',NULL),(12,6,'Who played the lead role in Mission: Impossible?','This actor is known for performing his own stunts and has been a top action star since the 1980s.',NULL),(13,6,'Who is the lead actor in Forrest Gump?','This actor is known for his versatile roles and has won multiple Academy Awards, including for Philadelphia and Cast Away.',NULL),(14,6,'Who played the lead role in Fight Club?','This actor is a Hollywood heartthrob known for his roles in Thelma & Louise and Once Upon a Time in Hollywood.',NULL);
/*!40000 ALTER TABLE `tblQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblQuizzes`
--

DROP TABLE IF EXISTS `tblQuizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblQuizzes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `Category` int DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `ImageUrl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Title` (`Title`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblQuizzes`
--

LOCK TABLES `tblQuizzes` WRITE;
/*!40000 ALTER TABLE `tblQuizzes` DISABLE KEYS */;
INSERT INTO `tblQuizzes` VALUES (1,'Guess The Artist By Their Song',1,'Given the song, can you guess the correct artist','src/assets/images/music.jpg'),(2,'Guess The Song By The Artist',1,'Given the artist, can you guess the correct song','src/assets/images/music.jpg'),(4,'Guess The Country With 1 Vowel',3,'Can you guess the country with exactly 1 vowel in the name?','src/assets/images/geography.jpg'),(5,'Name the National Cities of the Canadian Provinces',3,'Can you name all the national cities in all the Canadian provinces?','src/assets/images/geography.jpg'),(6,'Name the Lead Actor in the Movie',6,'Given the move names, can you name the lead actor?',NULL);
/*!40000 ALTER TABLE `tblQuizzes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-17 13:44:40
