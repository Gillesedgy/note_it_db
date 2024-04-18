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
//* SHOW => GET one NOte by ID √
const getOneNote = async (userId, noteId) => {
  // const { userId } = req.user.user_id; //
  try {
    const oneNote = await db.one(
      "SELECT * FROM notes WHERE user_id=$1 AND id=$2 ",
      [userId, noteId]
    );
    return oneNote;
  } catch (error) {
    console.error(`Error fetching note: ${error}`);
    throw new Error("Failed to fetch note");
  }
};
//* POST -- CREATE
const createNote = async (note) => {
  const { userId, title, content,  is_bookmark } = note;
  try {
    const newNote = await db.one(
      "INSERT INTO notes (user_id, title, content, is_bookmark) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, content, is_bookmark]
    );
    return newNote;
  } catch (error) {
    console.error(`Error creating note: ${error}`);
    throw new Error("Failed to create note");
  }
};
//* PUT -- UPDATE / EDIT
const updateNote = async (noteId, userId, noteData) => {
  const { title, content, is_bookmark } = noteData;
  try {
    if (!userId) throw new Error("User ID is undefined");
    const updatedNote = await db.one(
      "UPDATE notes SET title = $1, content = $2, is_bookmark = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, content, is_bookmark, noteId, userId]
    );
    return updatedNote;
  } catch (error) {
    console.error(`Error updating note: ${error}`);
    throw new Error("Failed to update note");
  }
};
//* DELETE --  REMOVE
const deleteNote = async (noteId, userId) => {
  try {
    const note = await db.oneOrNone(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [noteId, userId]
    );
    if (note) {
      const deletedNote = await db.one(
        "DELETE FROM notes WHERE id=$1 AND user_id=$2 RETURNING *",
        [noteId, userId]
      );
      return deletedNote;
    }
    return null;
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
