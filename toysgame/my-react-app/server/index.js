const express = require('express');
const PORT = 3000;
const app = express();
var cors = require('cors')
app.use(cors())

const db = require("./Models/index");

const gameRoute = require("./Routes/games.route");

// const categoryRoute = require("./Routes/category.route");

const usersRoute = require("./Routes/users.route");
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.static(__dirname + '/../front/dist'));
//Route games,category and users
app.use("/api/games", gameRoute);
// app.use("/api/category", categoryRoute);
app.use("/api/users", usersRoute);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

