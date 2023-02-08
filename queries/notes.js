const db = require("../db/dbConfig.js");

// Setting up for ROUTES

//* INDEX
const getAllNotes = async () => {
  try {
    const allNotes = await db.any("SELECT * FROM notes");
    return allNotes;
  } catch (error) {
    return error;
  }
};
//* SHOW
const getOneNote = async (id) => {
  try {
    const oneNote = await db.one("SELECT * FROM notes WHERE id=$1", id);
    return oneNote;
  } catch (error) {
    return error;
  }
};
//* POST -- CREATE
const createNote = async (note) => {
  try {
    const newNote = await db.one(
      "INSERT INTO notes(title, content, date, time, is_bookmark) VALUES($1, $2, $3, $4, $5) RETURNING * ",
      [note.title, note.content, note.date, note.time, note.is_bookmark]
    );
    return newNote;
  } catch (error) {
    return error;
  }
};
//* PUT -- UPDATE / EDIT
const updateNote = async (id, note) => {
  try {
    const updatedNote = await db.one(
      "UPDATE notes SET title=$1, content=$2, date=$3, time=$4, is_bookmark=$5 WHERE id=$6 RETURNING *",
      [note.title, note.content, note.date, note.time, note.is_bookmark, id]
    );
    return updatedNote;
  } catch (error) {
    return error;
  }
};
//* DELETE -- ''
const deleteNote = async (id) => {
  try {
    const deletedNote = await db.one(
      "DELETE FROM notes WHERE id=$1 RETURNING *",
      id
    );
    return deletedNote;
  } catch (error) {
    return error;
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
