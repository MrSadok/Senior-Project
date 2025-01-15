const express = require("express");
const router = express.Router();

// Require controller modules.
const {
    getAllUsers,
    addUser,
    getOneUser,
    deleteUser,
    updateUser,
    LoginUser,
} = require("../Controllers/users.controller");

/// todos ROUTES ///

router.get("/getAll", getAllUsers);
router.post("/add", addUser);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/login", LoginUser);

module.exports = router;