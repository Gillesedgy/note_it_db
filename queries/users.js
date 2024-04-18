//5
const db = require("../db/dbConfig");

//* Sign Up / CREATE A USER √
const createUser = async (username, email, hashedPassword) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    return newUser;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    throw new Error("Failed to create user");
  }
}; //* USERNAME => USED TO LOG IN √
const findByUsername = async (username) => {
  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return user;
  } catch (error) {
    console.error(`Error finding user: ${error}`);
    throw new Error("Failed to find user");
  }
};
//! ALL USERS IN DB  x
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error("Failed to fetch users");
  }
};
//* GET SINGLE USER BY ID => PROFILE x
const getSingleUser = async (userId) => {
  try {
    const singleUser = await db.one("SELECT * FROM users WHERE  id=$1", [
      userId,
    ]);
    return singleUser;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error("Failed to fetch user");
  }
};
//! USER NOTES √
const getUserNotes = async (userId) => {
  // const { userId } = req.user.user_id; //
  try {
    const notes = await db.any(
      "SELECT  user_id, notes.id,title, content FROM notes INNER JOIN users ON notes.user_id = users.id WHERE notes.user_id =$1",
      [userId]
    );
    return notes;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error("Failed to fetch user");
  }
};

// EMAIL
const findUserByEmail = async (email) => {
  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    return user;
  } catch (error) {
    console.error(`Error finding user: ${error}`);
    throw new Error("Failed to find user");
  }
};

module.exports = {
  // getAllUsers,
  getSingleUser,
  createUser,
  getUserNotes,
  findUserByEmail,
  findByUsername,
};
