import React, { useEffect, useState, useRef } from "react";
import "./banner.css";
import { getmovies, getMovieDetails } from "../../Services/Movies";
import { imagebaseurl } from "../../constance";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [Trending, setTrending] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [youtubeKey, setYoutubeKey] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [movies, setMovies] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getmovies();
      if (response?.results?.length > 0) {
        setMovies(response.results);
        let index = 0;
        setTrending(response.results[index]);

        const startInterval = () => {
          intervalRef.current = setInterval(() => {
            index = (index + 1) % response.results.length;
            setTrending(response.results[index]);
          }, 3000);
        };

        startInterval();

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

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

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

    if (movies.length > 0) {
      let index = 0;
      setTrending(movies[index]);

      intervalRef.current = setInterval(() => {
        index = (index + 1) % movies.length;
        setTrending(movies[index]);
      }, 3000);
    }
  };

  const displayMovie = showVideo ? currentMovie : Trending;

  const navigate = useNavigate();
  function showmylist(id) {
    console.log(id, "id in banner");
    navigate(`/mylist/${id}`);
  }

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
              <div className="btn" onClick={() => showmylist(Trending.id)}>+ Details</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
