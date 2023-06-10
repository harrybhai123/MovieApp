import React, { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();
const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=Your_API_Key&language=en-US&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const searchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=Your_API_Key&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error("Error searching movies:", error);
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        searchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

const useGlobalMovieContext = () => {
  return useContext(MovieContext);
};

export { MovieContext, MovieProvider, useGlobalMovieContext };
