import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import OneGame from "./OneGame";
import AddGame from "./AddGame";

function Games({ data, handleDelete, handleAdd }) {
  const [addGame, setAddGame] = useState(false);
  const navigate = useNavigate();
  const handleAddGame = () => {
    setAddGame(true);
    navigate("/added");
  };

  return (
    <>
      <Link className="navbar-brand" to="/added" onClick={handleAddGame}>
        Add Game
      </Link>
      <br></br>
      <div className="game_wrapper row">
        {data.map((game, index) => (
          <OneGame game={game} key={index} handleDelete={handleDelete} />
        ))}
      </div>{" "}
    </>
  );
}

export default Games;
