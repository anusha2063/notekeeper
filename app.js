const notes = require('./notes');

const command = process.argv[2];
const title = process.argv[3];
const body = process.argv[4];

if (command === 'add') {
    notes.addNote(title, body);
} else if (command === 'list') {
    notes.listNotes();
} else if (command === 'delete') {
    notes.deleteNote(title);
} else {
    console.log('❓ Unknown command');
}
