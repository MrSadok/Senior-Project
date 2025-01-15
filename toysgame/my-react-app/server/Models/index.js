
const { Sequelize, DataTypes } = require("sequelize");
const connection = new Sequelize("toystore", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
const testConnection = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testConnection();
const db = {};

db.connection = connection;
// // db.connection = connection;
db.Games = require('./games.model')(connection, DataTypes);
db.Category = require('./category.model')(connection, DataTypes);
db.Users = require('./users.model')(connection, DataTypes);

db.Users.hasMany(db.Games);
db.Games.belongsTo(db.Users);
db.Category.hasMany(db.Games);
db.Games.belongsTo(db.Category);



// connection
//   .sync({ force: true })
//   .then(() => {
//     console.log("tables are created inside datbase");
//   })
//   .catch((err) => {
//     throw err;
//   });


module.exports = db;
// You can use the .authenticate() function to test if the connection is OK
// finish implementing the database logic
