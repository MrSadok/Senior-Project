const express = require("express");
const router = express.Router();

// Require controller modules.
const {
    getAllCategory,
    addCategory,
    deleteCategory,
    updateCategory,
  
} = require("../Controllers/users.controller");

/// todos ROUTES ///

router.get("/getAll", getAllCategory);
router.post("/add", addCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);
module.exports = router;