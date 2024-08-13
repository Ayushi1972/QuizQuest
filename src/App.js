// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Create from './pages/Create';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/pages/Home" element={<Home />} />
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
