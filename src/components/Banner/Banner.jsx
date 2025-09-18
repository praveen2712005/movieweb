import React, { useEffect, useState, useRef } from "react";
import "./banner.css";
import { getmovies, getMovieDetails } from "../../Services/Movies";
import { imagebaseurl } from "../../constance";

function Banner() {
  const [Trending, setTrending] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null); // Track the movie being played
  const [youtubeKey, setYoutubeKey] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [movies, setMovies] = useState([]); // Store all movies
  const intervalRef = useRef(null); // Reference to the interval

  useEffect(() => {
    const fetchData = async () => {
      let response = await getmovies();
      if (response?.results?.length > 0) {
        setMovies(response.results); // Store all movies
        let index = 0;
        setTrending(response.results[index]); // first movie initially

        const startInterval = () => {
          intervalRef.current = setInterval(() => {
            index = (index + 1) % response.results.length; // cycle through movies
            setTrending(response.results[index]);
          }, 3000);
        };

        // Start the cycling interval
        startInterval();

        // cleanup when component unmounts
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }
    };

    fetchData();
  }, []);

  async function handlePlay(id) {
    try {
      console.log(id, "id --");
      
      // Stop the cycling interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Find the current movie being played
      const playingMovie = movies.find(movie => movie.id === id);
      setCurrentMovie(playingMovie);

      let response = await getMovieDetails(id);
      console.log(response, "++++++++++++++++++++++++)_______________________");
      setYoutubeKey(response.data.results[0].key);
      setShowVideo(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseVideo = () => {
    setShowVideo(false);
    setYoutubeKey('');
    setCurrentMovie(null);

    // Restart the cycling interval
    if (movies.length > 0) {
      let index = 0;
      setTrending(movies[index]);
      
      intervalRef.current = setInterval(() => {
        index = (index + 1) % movies.length;
        setTrending(movies[index]);
      }, 3000);
    }
  };

  // Determine which movie data to display
  const displayMovie = showVideo ? currentMovie : Trending;

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: !showVideo && Trending
            ? `url(${imagebaseurl}${Trending.backdrop_path})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* YouTube Video Background */}
        {showVideo && youtubeKey && (
          <div className="video-background">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&mute=1&loop=1&playlist=${youtubeKey}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            ></iframe>
          </div>
        )}

        <div className="banner-overlay" style={{ zIndex: 2, position: 'relative' }}>
          <div className="banner-content">
            <h1 className="banner-title">{displayMovie?.title || displayMovie?.name}</h1>
            <p className="banner-description">
              {displayMovie?.overview?.substring(0, 150)}...
            </p>
            <div className="banner-buttons">
              {!showVideo ? (
                <div className="btn" onClick={() => handlePlay(Trending.id)}>▶ Play</div>
              ) : (
                <div className="btn" onClick={handleCloseVideo}>⏹ Stop</div>
              )}
              <div className="btn">+ My List</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;