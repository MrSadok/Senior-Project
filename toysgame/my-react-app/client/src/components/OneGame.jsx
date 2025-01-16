import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function OneGame({ game, index, handleDelete }) {
  return (
    <div className=" col-md-3 col-12 pr-0">
      <div className="card card-box">
        <img src={game.imageUrl} className="card-img-top" alt="img" />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">{game.description}</p>
          <h4 className="card-title">{game.price}</h4>
          <a href="#" className="btn-buy">
            Buy
          </a>
          <Link
            className="btn-update"
            to={`/update/${game.id}`} // Pass the game ID to the UpdateGame comp
            state={{ game }}// Pass the game data as state
          >
            Update Game
          </Link>{" "}
          <a
            href="#"
            className="btn-delete"
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
