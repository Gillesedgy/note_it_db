const db = require("../db/dbConfig.js");

//* INDEX
const getAllNotes = async () => {
  try {
    const allNotes = await db.any("SELECT * FROM notes");
    return allNotes;
  } catch (error) {
    console.error(`Error fetching notes: ${error}`);
    throw new Error("Failed to fetch notes");
  }
};
//* SHOW => ONE NOTE
const getOneNote = async (userId) => {
  try {
    const oneNote = await db.oneOrNone("SELECT * FROM notes WHERE id=$1 LIMIT 1", [
      userId,
    ]);
    return oneNote;
  } catch (error) {
    console.error(`Error fetching note: ${error}`);
    throw new Error("Failed to fetch note");
  }
};
//* POST -- CREATE
const createNote = async (note) => {
  const { userId, title, content, date, is_bookmark } = note;
  try {
    const newNote = await db.one(
      "INSERT INTO notes (user_id, title, content, date, is_bookmark) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, title, content, date, is_bookmark]
    );
    return newNote;
  } catch (error) {
    console.error(`Error creating note: ${error}`);
    throw new Error("Failed to create note");
  }
};
//* PUT -- UPDATE / EDIT
const updateNote = async (noteId, userId, note) => {
  const { title, content, is_bookmark } = note;
  try {
    if (!userId) throw new Error("User ID is undefined");
    const updatedNote = await db.one(
      "UPDATE notes SET title=$1, content=$2, is_bookmark=$3, created_at=NOW() WHERE id=$4 AND user_id=$5 RETURNING *",

      [title, content,  is_bookmark,  noteId,userId]

    );
    return updatedNote;
  } catch (error) {
    console.error(`Error updating note: ${error}`);
    throw new Error("Failed to update note");
  }
};
//* DELETE --  REMOVE
const deleteNote = async (id, userID) => {
  try {
    const deletedNote = await db.one(
      "DELETE FROM notes WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userID]
    );
    return deletedNote;
  } catch (error) {
    console.error(`Error deleting note: ${error}`);
    throw new Error("Failed to delete note");
  }
};
// Export FUNCTIONS
module.exports = {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
};

// this file defines and exports functions to perform CRUD
