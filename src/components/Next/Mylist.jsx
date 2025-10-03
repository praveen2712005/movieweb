import React, { useState, useEffect } from 'react';
import "./mylist.css";
import { getmovies, getMovieById, getMovieDetails } from '../../Services/Movies';
import { useParams } from "react-router-dom";

export default function MyList() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [youtubeKey, setYoutubeKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        // Get all trending movies instead of details for one movie
        let response = await getmovies();
        setMovies(response.results || []);
      } catch (error) {
        console.log(error);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []); // Removed id dependency to load all movies

  async function handleMovieClick(movie) {
    try {
      if (selectedMovie?.id === movie.id) {
        setSelectedMovie(null);
        setYoutubeKey('');
      } else {
        setSelectedMovie(movie);
        
        // Fetch trailer for the selected movie
        let response = await getMovieDetails(movie.id);
        if (response.data.results && response.data.results.length > 0) {
          setYoutubeKey(response.data.results[0].key);
        } else {
          setYoutubeKey('');
        }
      }
    } catch (error) {
      console.log(error);
      setYoutubeKey('');
    }
  }

  function handleCloseDetails() {
    setSelectedMovie(null);
    setYoutubeKey('');
  }

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mylist-container">
      <h1 className="mylist-title">Movie Details</h1>
      
      <div className='movies-grid'>
        {movies.map(movie => (
          <div
            key={movie.id}
            className={`movie-item ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
            onClick={() => handleMovieClick(movie)}
          >
            <div className="movie-poster">
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                  alt={movie.title}
                />
              ) : (
                <div className="poster-placeholder">No Image</div>
              )}
            </div>
            <div className="movie-title">{movie.title || movie.name}</div>
            {movie.release_date && (
              <div className="movie-year">({new Date(movie.release_date).getFullYear()})</div>
            )}
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details-overlay">
          <div className="movie-details-card">
            <button className="close-btn" onClick={handleCloseDetails}>×</button>
            <div className="details-content">
              <div className="details-poster">
                {selectedMovie.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`} 
                    alt={selectedMovie.title}
                  />
                ) : (
                  <div className="poster-placeholder large">No Image</div>
                )}
              </div>
              <div className="details-info">
                <h2>{selectedMovie.title || selectedMovie.name}</h2>
                {selectedMovie.release_date && (
                  <p className="release-date">
                    Release Date: {new Date(selectedMovie.release_date).toLocaleDateString()}
                  </p>
                )}
                {selectedMovie.vote_average && (
                  <p className="rating">Rating: ⭐ {selectedMovie.vote_average}/10</p>
                )}
                {selectedMovie.overview && (
                  <div className="overview">
                    <h3>Overview</h3>
                    <p>{selectedMovie.overview}</p>
                  </div>
                )}
                
                {/* YouTube Trailer */}
                {youtubeKey && (
                  <div className="trailer-section">
                    <h3>Trailer</h3>
                    <div className="trailer-container">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${youtubeKey}`}
                        title={`${selectedMovie.title} trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                
                {/* Movie Details */}
                <div className="additional-details">
                  {selectedMovie.original_language && (
                    <p><strong>Original Language:</strong> {selectedMovie.original_language.toUpperCase()}</p>
                  )}
                  {selectedMovie.vote_count && (
                    <p><strong>Vote Count:</strong> {selectedMovie.vote_count}</p>
                  )}
                  {selectedMovie.popularity && (
                    <p><strong>Popularity:</strong> {selectedMovie.popularity}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}