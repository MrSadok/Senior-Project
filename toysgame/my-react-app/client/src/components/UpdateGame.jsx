import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function UpdateGame({ handleUpdateGame }) {
  const { id } = useParams(); 
  const { state } = useLocation(); 
  const navigate = useNavigate();

  const [name, setName] = useState(state.game.name);
  const [description, setDescription] = useState(state.game.description);
  const [price, setPrice] = useState(state.game.price);
  const [quantity, setQuantity] = useState(state.game.quantity);
  const [imageUrl, setImageUrl] = useState(state.game.imageUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedGame = {
      name,
      description,
      price,
      quantity,
      imageUrl,
    };

    try {
      console.log(id,"iiid")
      await handleUpdateGame(id, updatedGame); 
      navigate("/"); 
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  return (
    <div>
      <h2>Update Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Game
        </button>
      </form>
    </div>
  );
}

export default UpdateGame;