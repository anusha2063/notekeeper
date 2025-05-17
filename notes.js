const fs = require('fs');

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        return JSON.parse(dataBuffer.toString());
    } catch {
        return [];
    }
}

function saveNotes(notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

function addNote(title, body) {
    const notes = loadNotes();
    notes.push({ title, body });
    saveNotes(notes);
    console.log('✅ Note added!');
}

function listNotes() {
    const notes = loadNotes();
    console.log('📝 Your Notes:');
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title}`);
    });
}

function deleteNote(title) {
    const notes = loadNotes();
    const filtered = notes.filter(note => note.title !== title);
    if (notes.length === filtered.length) {
        console.log('❌ Note not found!');
    } else {
        saveNotes(filtered);
        console.log('🗑️ Note deleted!');
    }
}

module.exports = { addNote, listNotes, deleteNote };
