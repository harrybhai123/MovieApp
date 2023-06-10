import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss"; // Import the SCSS file
import { useGlobalMovieContext } from "../../MovieContext";

const Home = () => {
  const { movies, loading } = useGlobalMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!loading && movies.length > 0) {
      // Select a random movie from the movies array
      const randomIndex = Math.floor(Math.random() * movies.length);
      setSelectedMovie(movies[randomIndex]);
    }
  }, [movies, loading]);

  const altImg = "/img/imgalt.png";

  return (
    <div className="home">
      <div className="movieHomeContainer">
        <div className="homeBtn">
          <button className="homeBtnCOM">
            <Link to="/movies">Check Out Movies</Link>
          </button>
        </div>
        <div className="movieDisplay">
          {selectedMovie ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                alt={selectedMovie.backdrop_path ? "" : selectedMovie.title}
                className="imgHome"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = altImg;
                }}
              />
              <h1 className="homeHeading">{selectedMovie.title}</h1>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
