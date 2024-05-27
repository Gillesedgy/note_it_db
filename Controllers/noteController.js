const express = require("express");
const notes = express.Router(); //
const errorHandler = require("../Middleware/errorHandling");

notes.use(errorHandler);
const {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../queries/notes");
const { getUserNotes } = require("../queries/users");

//ToDO: Change this for home page
notes.get("/", async (req, res, next) => {
  try {
    const allNotes = await getAllNotes();
    if (allNotes[0]) {
      res.status(200).json(allNotes);
    } else {
      res.status(500).json({ error: "No notes found" });
    }
  } catch (error) {
    next(error);
  }
});

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
});

notes.get("/user/:userId", async (req, res) => {
  const userId = req.user.id;
  try {
    const userNotes = await getUserNotes(userId);
    if (userNotes) {
      res.status(200).json(userNotes);
    }
  } catch (error) {
    res.status(500).send("User Not Found", error);
  }
});

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

notes.put("/user/:userId/note/:noteId", async (req, res, next) => {
  try {
    const { noteId, userId } = req.params;
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

module.exports = notes;
