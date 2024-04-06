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
//* SHOW
const getOneNote = async (id) => {
  try {
    const oneNote = await db.one("SELECT * FROM notes WHERE id=$1", id);
    return oneNote;
  } catch (error) {
    console.error(`Error fetching note: ${error}`);
    throw new Error("Failed to fetch note");
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
    console.error(`Error creating note: ${error}`);
    throw new Error("Failed to create note");
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
    console.error(`Error updating note: ${error}`);
    throw new Error("Failed to update note");
  }
};
//* DELETE --  REMOVE
const deleteNote = async (id) => {
  try {
    const deletedNote = await db.one(
      "DELETE FROM notes WHERE id=$1 RETURNING *",
      id
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
