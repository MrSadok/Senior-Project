const {Games} = require("../Models/index");

module.exports = {
  getAllGames: async(req, res) => {
    try {
      const game = await Games.findAll();
      res.send(game);
    } catch (error) {
      // throw error;
      res.status(500).send(error);
    }
  },
   
  addGame: async(req, res) => {
    try {
      const { name, description,imageUrl,price,quantity,UserId,categoryId } = req.body;
      const newGame = await Games.create({name,description,imageUrl,price,quantity,UserId,categoryId});
      res.status(201).send({
        success: "the game is created successfully",
      });
    } catch (error) {
      throw error;
    }
  },
  getOneGame: async function (req, res) {
    const { id } = req.params;
    console.log("idddddddddddddddddd", id);
    try {
      const game = await Games.findOne({
        where: {
          id: id,
        },
      });
      res.send(game);
    } catch (error) {
      // throw error;
      res.status(500).send(error);
    }
  },
  deleteGame: async function (req, res) {
    const { id } = req.params;
    console.log(id,"iddddd ");
    
    try {
      if (!id) {
        return res.status(401).send({ message: "id should be pass to params" });
      }
      const game = await Games.findOne({ id });
      if (!game) {
        return res.status(401).send({ message: "game not found" });
      }
      await Games.destroy({
        where: {
          id: id,
        },
      });
      return res.send({ message: "the game is deleted successfully" });
    } catch (error) {
      console.log(id,"id game")
      // throw error;
      res.status(500).send(error);
    }
  },
    updateGame: async function (req, res) {
    const { id } = req.params;
    const { name, description,imageUrl, price,quantity } = req.body;
    console.log(name,"naaaame")
    if (!id) {
      return res.status(401).send({ message: "id should be pass to params" });
    }
    const game = await Games.findOne({ id });
    if (!game) {
      return res.status(401).send({ message: "game not found" });
    }
    const updatedGame = await Games.update(
      {
        name: name || game.name,
        description: description || game.description,
        imageUrl: imageUrl || game.imageUrl,
        price: price || game.price,
        quantity: quantity || game.quantity,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send({ message: "the game is updated successfully" });
  },
};
