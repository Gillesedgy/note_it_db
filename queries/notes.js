const db = require("../db/dbConfig.js");

const getAllNotes = async () => {
  const allNotes = await db.any("SELECT * FROM notes");
  return allNotes;
};

const getOneNote = async (userId, noteId) => {
  const oneNote = await db.one(
    "SELECT * FROM notes WHERE user_id=$1 AND id=$2 ",
    [userId, noteId]
  );
  return oneNote;
};

const createNote = async (note) => {
  const { userId, title, content, is_bookmark } = note;
  const newNote = await db.one(
    "INSERT INTO notes (user_id, title, content, is_bookmark) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, title, content, is_bookmark]
  );
  return newNote;
};

const updateNote = async (noteId, userId, noteData) => {
  const { title, content, is_bookmark } = noteData;
  if (!userId) throw new Error("User ID is undefined");
  const updatedNote = await db.one(
    "UPDATE notes SET title = $1, content = $2, is_bookmark = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
    [title, content, is_bookmark, noteId, userId]
  );
  return updatedNote;
};

const deleteNote = async (noteId, userId) => {
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
};

module.exports = {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
};
