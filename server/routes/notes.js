const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: fetch all notes using: GET "/api/notes/fetchallnotes". login required 
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
})

// ROUTE 2: Add new notes using: POST "/api/notes/addnote". login required 
router.post("/addnote", fetchuser, [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Enter valid description").isLength({ min: 5 }),
], async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const notes = new Notes({
            title, description, tag, user: req.user.id
        });
        const saveNotes = await notes.save();
        res.json({ saveNotes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
})

// ROUTE 3: Update an existing notes using: POST "/api/notes/updatenote". login required 
router.put("/updatenote/:id", fetchuser, [
    body("title", "Enter valid Title").isLength({ min: 3 }),
    body("description", "Enter valid description").isLength({ min: 5 }),
], async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        // create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Access Denied!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
})

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id" , login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send(" Not Exists") }
        
        // Allows deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send(" Not Allowed ")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success" : "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

module.exports = router;