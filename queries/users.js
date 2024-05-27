//5
const db = require("../db/dbConfig");

const createUser = async (username, email, hashedPassword) => {
  const newUser = await db.one(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashedPassword]
  );
  return newUser;
};

const findByUsername = async (username) => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return user;
};
//! ALL USERS IN DB  x
const getAllUsers = async () => {
  const allUsers = await db.any("SELECT * FROM users");
  return allUsers;
};

const getSingleUser = async (userId) => {
  const singleUser = await db.one("SELECT * FROM users WHERE  id=$1", [userId]);
  return singleUser;
};

//! USER NOTES √
const getUserNotes = async (userId) => {
  const notes = await db.any(
    "SELECT  user_id, notes.id,title, content FROM notes INNER JOIN users ON notes.user_id = users.id WHERE notes.user_id =$1",
    [userId]
  );
  return notes;
};

// EMAIL
const findUserByEmail = async (email) => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return user;
};

module.exports = {
  // getAllUsers,
  getSingleUser,
  createUser,
  getUserNotes,
  findUserByEmail,
  findByUsername,
};
