//6
const bcrypt = require("bcrypt");
const jwtAuth = require("../utils/jwtAuth");
const userAuth = require("../Middleware/userAuth");
require("dotenv").config();
const validateUser = require("../Middleware/userError"); //TODO:MUST VALIDATE INFOR

const {
  getAllUsers,
  getSingleUser,
  createUser,
  findUserByEmail,
  findByUsername,
} = require("../queries/users");
//
const users = require("express").Router();

users.post("/signup", validateUser, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userByUsername = await findByUsername(username);
    const userByEmail = await findUserByEmail(email);

    if (userByUsername) {
      return res
        .status(409)
        .json({ message: `Sorry, ${userByUsername.username} already taken` });
    }
    if (userByEmail) {
      return res
        .status(409)
        .json({ message: `Sorry, ${userByEmail.email} already taken` });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await createUser(username, email, hashedPassword);
    //5 Generate token =>
    const token = jwtAuth(newUser.id);

    res.status(201).json({ newUser, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error", error);
  }
});

users.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findByUsername(username); // log in with username
    console.log("User:", username);

    if (!user) {
      return res.status(401).json({ message: `User ${username} not found` });
    }

    console.log("Password:", password);
    console.log("Hashed Password:", user.password_hash);

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwtAuth(user.id);
    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

users.get("/verify", userAuth, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

users.get("/dashboard", userAuth, async (req, res) => {
  // const userID = req
  console.log("URSER REQ:", req.user);
  try {
    const user = await getSingleUser(req.user);

    if (!user.id) {
      res.status(404).json({ message: `${user.id} Not Found` });
    }

    const { username, email } = user;
    res.status(200).json({ username, email });
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

module.exports = users;
