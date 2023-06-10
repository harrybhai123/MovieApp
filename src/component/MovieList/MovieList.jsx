import React, { useEffect, useState } from 'react';
import './MovieList.scss';
import { useGlobalMovieContext } from '../../MovieContext';
import { Link } from 'react-router-dom';

function MovieList() {
  const [showAnimation, setShowAnimation] = useState(false);
  const { movies, currentPage, totalPages, goToNextPage, goToPreviousPage } = useGlobalMovieContext();

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const altImg = "/img/imgalt.png";

  return (
    <>
      <div className="paginationAbove">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div className="movieList">
        {movies && movies.length > 0 ? (
          <>
            {movies.map((m) => (
              <Link to={`/movies/${m.id}`} key={m.id} className='movieLink'>
                <div
                  className={`movieContainer ${showAnimation ? 'fade-in' : ''}`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${m && m.backdrop_path}`}
                    alt={m.backdrop_path ? '' : 'Alternative Image'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = altImg;
                    }}
                  />
                  <h1 className='movieLinkTitle'>{m.title.substring(0, 20)}...</h1>
                </div>
              </Link>
            ))}
            <div className="pagination">
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default MovieList;
