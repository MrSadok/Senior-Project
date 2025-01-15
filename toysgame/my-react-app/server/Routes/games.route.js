const express = require("express");
const router = express.Router();

// Require controller modules.
const {
    getAllGames,
    addGame,
    getOneGame,
    deleteGame,
    updateGame,
  
} = require("../Controllers/games.controller");

/// todos ROUTES ///

router.get("/getAll", getAllGames);
router.post("/add", addGame);
router.get("/:id", getOneGame);
router.delete("/:id", deleteGame);
router.put("/:id", updateGame);
module.exports = router;