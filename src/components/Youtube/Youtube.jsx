import React from "react";
import YouTube from "react-youtube";

export default function Youtube({youtubeKey}) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return <YouTube videoId={youtubeKey} opts={opts} onReady={onReady} />;
}
