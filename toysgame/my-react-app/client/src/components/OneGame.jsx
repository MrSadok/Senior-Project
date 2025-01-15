import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/**
 * App Component
 *
 * This component represents the main application component.
 * It contains the navigation bar and the main content.
 */
function OneGame({ game, index, handleDelete }) {
  return (
    <div className=" col-md-3 col-12 pr-0">
      <div className="card card-box">
        <img src={game.imageUrl} className="card-img-top" alt="img" />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">{game.description}</p>
          <h4 className="card-title">{game.price}</h4>
          <a href="#" className="btn btn-primary">
            Buy
          </a>
          <Link
            className="btn btn-warning"
            to={`/update/${game.id}`} // Pass the game ID to the UpdateGame component
            state={{ game }} // Pass the game data as state
          >
            Update Game
          </Link>{" "}
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => handleDelete(game.id)}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default OneGame;
