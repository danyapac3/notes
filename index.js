import { createNoteElement, createNoteFormElement } from './components.js';
import { generateUniqueId } from './utils.js';
import { storageUtils } from './storage.js';

const noteList = document.querySelector('.note-list');
const noteForm = createNoteFormElement(() => {
  const fields = noteForm.fields
  const note = { 
    title: fields.title,
    content: fields.content,
    uniqueId: generateUniqueId(), 
  };

  storageUtils.addNotes(note);
  const noteElement = createNoteElement(fields.title, fields.content, () => {
    storageUtils.removeNoteById(note.uniqueId);
  });
  
  noteForm.after(noteElement);
});

noteList.appendChild(noteForm);

if (storageUtils.getNotes() === null)
  storageUtils.saveNotes([]);

storageUtils.getNotes().forEach(note => {
  console.log(note);
  const noteElement = createNoteElement(note.title, note.content, () => {
    storageUtils.removeNoteById(note.uniqueId);
  });
  noteForm.after(noteElement);
});
