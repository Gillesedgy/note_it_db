const express = require("express");
// Set up Router using notes
const notes = express.Router();

//Import query functions from queries
const {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../queries/notes");

// INDEX
notes.get("/", async (req, res) => {
  const allNotes = await getAllNotes();
  //   res.send("hello, here are your notes");
  if (allNotes[0]) {
    res.status(200).json(allNotes);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

//SHOW
notes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneNote = await getOneNote(id);
  if (!oneNote.message) {
    res.status(200).json(oneNote);
  } else {
    res.status(400).json({ error: "Note Not Found!" });
  }
});

// CREATE
notes.post("/", async (req, res) => {
  try {
    const newNote = await createNote(req.body);
    res.status(200).json(newNote);
  } catch (error) {
    res.status(400).json({ error: "Cannot be created!" });
  }
});

// UPDATE
notes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await updateNote(id, req.body);
    res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(400).json({ error: "Cannot update, ID not found" });
  }
});

// DELETE
notes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await deleteNote(id);
    return res.status(200).json(deletedNote);
  } catch (error) {
    res.status(400).json({ error: "Cannot delete" });
  }
});

// EXPORT ROUTER (/NOTES)
module.exports = notes;
