import React, { useEffect, useState, useRef } from "react";
import "./movies.css";
import { imagebaseurl } from "../../constance";
import { getMovieDetails } from "../../Services/Movies";

function Movies({ title, movies = [], series = [] }) {
  const [items, setItems] = useState([]);
  const [youtubeKey, setYoutubeKey] = useState('');
  const [playingMovieId, setPlayingMovieId] = useState(null);
  const rowRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollSpeed = 1;

  useEffect(() => {
    if (movies.length > 0) {
      setItems(movies);
    } else if (series.length > 0) {
      setItems(series);
    }
  }, [movies, series]);

  useEffect(() => {
    if (!rowRef.current || items.length <= 3 || isPaused) return;

    const scrollContainer = rowRef.current;
    let scrollInterval = setInterval(() => {
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth - 10
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [items, isPaused]);

  async function playSub(id) {
    try {
      console.log(id, "id --");
      let response = await getMovieDetails(id);
      console.log(response, "++++++++++++++++++++++++)_______________________ approved");
      setYoutubeKey(response.data.results[0].key);
      setPlayingMovieId(id);
    } catch (error) {
      console.log(error);
    }
  }

  const handleStopVideo = (movieId) => {
    if (playingMovieId === movieId) {
      setYoutubeKey('');
      setPlayingMovieId(null);
    }
  };

  const handleCardMouseEnter = (obj) => {
    if (playingMovieId !== obj.id) {
      playSub(obj.id);
    }
  };

  const handleCardMouseLeave = (obj) => {
    if (playingMovieId === obj.id) {
      handleStopVideo(obj.id);
    }
  };

  return (
    <>
      <div className="movie-row">
        <h2 className="row-title">{title}</h2>
        <div
          className="row-cards"
          ref={rowRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {items.map((obj) => (
            <div
              key={obj.id}
              className={`movie-card ${playingMovieId === obj.id ? 'playing-video' : ''}`}
              style={{
                backgroundImage: `url(${imagebaseurl}${obj.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
              onMouseEnter={() => handleCardMouseEnter(obj)}
              onMouseLeave={() => handleCardMouseLeave(obj)}
            >
              {/* YouTube Video Overlay for this card */}
              {playingMovieId === obj.id && youtubeKey && (
                <div className="card-video-overlay">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&mute=1&loop=1&playlist=${youtubeKey}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="card-content">
                <h3 className="movie-title">{obj.title || obj.name}</h3>
                
              </div>
              <div className="card-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Movies;