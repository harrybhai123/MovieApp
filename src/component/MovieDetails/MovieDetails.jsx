import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalMovieContext } from '../../MovieContext';
import './MovieDetails.scss';

function MovieDetails() {
  const { movieId } = useParams();
  const { movies } = useGlobalMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Find the movie with matching ID
      const movie = movies.find((m) => m.id === parseInt(movieId));

      // Set the selected movie
      setSelectedMovie(movie);
    };

    fetchMovieDetails();
  }, [movies, movieId]);

  const altImg = "/img/imgalt.png";

  return (
    <div className="movieDetails">
      {selectedMovie ? (
        <div className="movieInfo">
          <div className="movieImgBoss">
            <img
              src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
              alt={selectedMovie.backdrop_path ? '' : selectedMovie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = altImg;
              }}
            />
          </div>
          <h1 className='movieInfoheading'>Movie Name: <span>{selectedMovie.title}</span></h1>
          <p>Release Date: <span>{selectedMovie.release_date}</span></p>
          <p>Original Language: <span>{selectedMovie.original_language}</span></p>
          <p>Popularity: <span>{selectedMovie.popularity}</span></p>
          <p>Average Vote: <span>{selectedMovie.vote_average}</span></p>
          <p>Vote Count: <span>{selectedMovie.vote_count}</span></p>
          <p>Description: <span>{selectedMovie.overview}</span></p>
          <div className="movieBtns">
            <button className='movieInfoHomeBtn'>
              <Link to="/">Home</Link>
            </button>
            <button className='movieInfoSeeMoreBtn'>
              <Link to="/movies">See Movie List</Link>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
