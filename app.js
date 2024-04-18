// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//CONTROLLERS
const notesController = require("./Controllers/noteController");
//Users
const usersController = require("./Controllers/usersController");
// CONFIGURATION
const app = express();

// MIDDLEWARE
const userAuth = require("./Middleware/userAuth");
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/notes", userAuth, notesController);
app.use("/user", userAuth, usersController);
app.get("/", (req, res) => {
  res.send("Welcome to Note-It");
});

app.get("*", (req, res) => {
  res.status(404).json("Page not found");
});

// EXPORT
module.exports = app;
