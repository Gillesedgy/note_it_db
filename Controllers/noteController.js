const express = require("express");
// Set up Router using notes
const notes = express.Router(); // NEW router object
const errorHandler = require("../Middleware/errorHandling");

notes.use(errorHandler);
//Import query functions from queries to perfrom CRUD
const {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../queries/notes");

//USERS's  DB resources
const { getUserNotes } = require("../queries/users");
// INDEX - retrieves all the notes from the database
//ToDO: Change this for hom page
notes.get("/", async (req, res, next) => {
  try {
    const allNotes = await getAllNotes();
    if (allNotes[0]) {
      res.status(200).json(allNotes);
    } else {
      res.status(500).json({ error: "server error" });
    }
  } catch (error) {
    next(error);
  }
});

//* CREATE - create a new note by calling the createNote functions... req.body as param
//! √

notes.post("/user/:userId/create-a-note", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, content, is_bookmark } = req.body;
    const newNote = await createNote({ userId, title, content, is_bookmark });
    if (newNote) {
      res.status(200).json(newNote);
    } else {
      const error = new Error("Cannot be created!");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
}); //Notes Posted  by a user
//! Fetching Notes  For A USER WITH {UserId:} √
notes.get("/user/:userId", async (req, res) => {
  const userId = req.user.id;
  try {
    // console.log(`Fetching notes for user ID: ${userId}`);
    const userNotes = await getUserNotes(userId);
    if (userNotes) {
      res.status(200).json(userNotes);
    }
  } catch (error) {
    res.status(500).send("User Not Found", error);
  }
});
//SHOW - a single note from the database by calling  getone note providing {id} params

notes.get("/user/:userId/note/:noteId", async (req, res, next) => {
  try {
    const { noteId, userId } = req.params;
    const oneNote = await getOneNote(userId, noteId);
    if (!oneNote.message) {
      res.status(200).json(oneNote);
    } else {
      res.status(400).json({ error: "Note Not Found!" });
    }
  } catch (error) {
    next(error);
  }
});

// UPDATE - updates an existing note by calling the upadateNote function usoing their {id} in the params for the url path

notes.put("/user/:userId/note/:noteId", async (req, res, next) => {
  try {
    const { noteId, userId } = req.params;
    // const {}= req.user;
    const noteData = req.body;
    const updatedNote = await updateNote(noteId, userId, noteData);
    if (updatedNote) {
      res.status(200).json(updatedNote);
    } else {
      const error = new Error("Cannot update, ID not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// DELETE - using the deleteNote function, caan delete a notew from the database using their specific {id} as parameter in the URL responding with the json object.

notes.delete("/user/:userId/note/:noteId", async (req, res, next) => {
  try {
    const { userId, noteId } = req.params;
    // const { userId } = req;
    const deletedNote = await deleteNote(noteId, userId);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res
      .status(200)
      .json({ message: "Note deleted successfully", note: deletedNote });
  } catch (error) {
    next(error);
  }
});
// EXPORT ROUTER (/NOTES)
module.exports = notes;
