import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">MovieMaze</div>
      <div className="menu">
        <div>Home</div>
        <div>TV Shows</div>
        <div>Movies</div>
        <div>My List</div>
      </div>
    </div>
  );
}

export default Navbar;
