// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Categories from './pages/Categories/Categories';
import Create from './pages/Create/Create';
import QuizPage from './pages/QuizPage/QuizPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/pages/Home" element={<Home />} />
        <Route path="*" element={<Navigate to="/pages/Home" />} />
        <Route path="/pages/About" element={<About />} />
        <Route path="/pages/Categories" element={<Categories />} />
        <Route path="/pages/Create" element={<Create />} />
        <Route path="/quiz/:title" element={<QuizPage />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
