import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Register from "../../client/src/components/Register";
import Games from "../../client/src/components/Games";
import Cart from "../../client/src/components/Cart";
import axios from "axios";
import AddGame from "./components/AddGame";
import UpdateGame from "./components/UpdateGame";
function App() {

  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);  
  const [search, setSearch] = useState("");
const [user, Setuser] = useState(null);
  const handleSearch = (text) => {
    setSearch(text);
    if (text === "") {
      setData(fullData);  // Reset to all data when search is cleared
    } else {
      const filteredGames = fullData.filter((game) => 
        game.name.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredGames);
    }
  };


  const fetch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/games/getAll"
      );
      setData(response.data);
      setFullData(response.data);  // Store the original data
      console.log("dataaa", response.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetch();
    console.log(user,"useeeeeer")
  }, []);

  const handleUpdateGame = async (id, updatedGame) => {
    console.log("updated game", updatedGame);
    console.log("iddddddddddddddd", id);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/games/${id}`,
        updatedGame
      );
      // console.log(response.data);
      fetch();
    } catch (error) {
      throw error;
    }
  };
  const handleAdd = async (game) => {
    console.log(game, "gaame");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/games/add",
        game
      );
      // console.log(response.data);
      fetch();
     
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/games/${id}`
      );
      fetch();
    } catch (error) {
      throw error;
    }
  };
  return (
    <Router>

        
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Games&Toys
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/*">
                  Games
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul> 
            
            <div className="d-flex ms-auto">
            {user && (
              <div className="me-3 text-light">
                Welcome, {user}!
              </div>
            )}
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-light"
                type="button"
           
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route
            path="/*"
            element={
              <Games
                data={data}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
              />
            }
          />
          <Route path="/register" element={<Register Setuser={Setuser}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/added" element={<AddGame handleAdd={handleAdd} />} />
          <Route
            path="/update/:id"
            element={<UpdateGame handleUpdateGame={handleUpdateGame} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
