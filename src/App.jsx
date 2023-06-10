import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieList from './component/MovieList/MovieList';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Home from './pages/Home/Home';
import MovieDetails from './component/MovieDetails/MovieDetails';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </div>


  );
}

export default App;
