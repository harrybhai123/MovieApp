import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalMovieContext } from '../../MovieContext';
import './Navbar.scss';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const { searchMovies, movies } = useGlobalMovieContext();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    clearTimeout(debounceTimeoutRef.current);

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 1000);
  };

  const performSearch = (query) => {
    console.log('Searching for:', query);
    if (query.trim() !== '') {
      const filteredResults = searchMovies(query);
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]); // Set empty array for empty query
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]); // Set empty array for empty query
    }
  }, [searchQuery]);

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        <img src="/img/logo.jpg" alt="Logo" />
        <h1 className="NavHeading">Harry Movie App</h1>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </div>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      {searchQuery !== '' && searchResults.length > 0 && (
        <div ref={searchResultsRef} className="search-results">
          {searchResults.map((result) => (
            <Link to={`/movies/${result.id}`} key={result.id}>
              <div className="search-result">
                {result.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
