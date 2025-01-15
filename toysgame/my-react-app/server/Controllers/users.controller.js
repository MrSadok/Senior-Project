const {Users} = require("../Models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  getAllUsers: async(req, res) => {
    try {
      const user = await Users.findAll();
      res.send(user);
    } catch (error) {
      // throw error;
      res.status(500).send(error);
    }
  },
   
  addUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      // Check if the email already exists
      const checkuser = await Users.findOne({
        where: {
          email: email,
        },
      });
  
      if (checkuser) {
        return res.status(400).send({ message: "Email already exists!" });
      }
  
      // Hash the password asynchronously
      const hash = await bcrypt.hash(password, 10);
  
      // Create a new user in the database
      const newUser = await Users.create({ username, password: hash, email });
  
      // Respond with a success message
      res.status(201).send({
        success: "User created successfully!",
        user: newUser,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
    }
  },
  
  getOneUser: async function (req, res) {
    const { id } = req.params;
    console.log("idddddddddddddddddd", id);
    try {
      const user = await Users.findOne({
        where: {
          id: id,
        },
      });
      res.send(user);
    } catch (error) {
      // throw error;
      res.status(500).send(error);
    }
  },
  deleteUser: async function (req, res) {
    const { id } = req.params;
    console.log(id,"iddddd ");
    
    try {
      if (!id) {
        return res.status(401).send({ message: "id should be pass to params" });
      }
      const user = await Users.findOne({ id });
      if (!user) {
        return res.status(401).send({ message: "user not found" });
      }
      await Users.destroy({
        where: {
          id: id,
        },
      });
      return res.send({ message: "the user is deleted successfully" });
    } catch (error) {
      console.log(id,"id bagraa")
      // throw error;
      res.status(500).send(error);
    }
  },
  updateUser: async function (req, res) {
    const { id } = req.params;
    const { username, password, email } = req.body;
    if (!id) {
      return res.status(401).send({ message: "id should be pass to params" });
    }
    const user = await Users.findOne({ id });
    if (!user) {
      return res.status(401).send({ message: "user not found" });
    }
    const updatedUser = await Users.update(
      {
        username: username || user.username,
        password: password || user.password,
        email: email || user.email,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send({ message: "the user is updated successfully" });
  },
  LoginUser: async (req, res) => {
    try {
      const {email,password } = req.body;
        const user = await Users.findOne({
        where: {
          email: email,
        },
      });
  
      if (!user) {
        return res.status(400).send({ message: "Invalid email or password" });
      }
        const checkPass = await bcrypt.compare(password, user.password);
      
      if (!checkPass) {
        return res.status(400).send({ message: "Invalid email or password" });
      }
        const token = jwt.sign(
        { userId: user.id, email: user.email },
        'sadok',  
        { expiresIn: '1h' }
      );
  
      // Send response with user data and token
      res.status(200).send({
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
  
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
LoginUser: async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      // Log invalid login attempt
      console.error(`Login failed: No user found with email ${email}`);
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      // Log invalid password attempt
      console.error(`Login failed: Incorrect password for email ${email}`);
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'your-secret-key',  // replace with your actual secret key
      { expiresIn: '1h' }
    );

    // Log successful login attempt
    console.log(`Login successful: User ${user.username} logged in at ${new Date().toISOString()}`);

    res.status(200).send({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    // Log unexpected errors (server errors, database issues)
    console.error(`Error during login: ${error.message}`);
    res.status(500).send({ message: "Internal server error" });
  }
}