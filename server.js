const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Load notes from file
function loadNotes() {
  try {
    const data = fs.readFileSync('notes.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Save notes to file
function saveNotes(notes) {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

// Get all notes
app.get('/notes', (req, res) => {
  const notes = loadNotes();
  res.json(notes);
});

// Add note
app.post('/add', (req, res) => {
  const notes = loadNotes();
  const newNote = {
    title: req.body.title,
    body: req.body.body
  };
  notes.push(newNote);
  saveNotes(notes);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
