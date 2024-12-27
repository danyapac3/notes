import { createNoteElement, createNoteFormElement } from './components.js';
import { generateUniqueId } from './utils/uid.js';
import { storageUtils } from './utils/storage.js';

const noteList = document.querySelector('.note-list');
const noteForm = createNoteFormElement(() => {
  const note = { 
    title: noteForm.querySelector('.title').value.trim(),
    content: noteForm.querySelector('.content').value.trim(),
    uniqueId: generateUniqueId(), 
  };
  if (note.title === '' || note.content === '') return;

  storageUtils.addNotes(note);
  const noteElement = createNoteElement(note.title, note.content, () => {
    storageUtils.removeNoteById(note.uniqueId);
  });
  
  noteForm.after(noteElement);
});

noteList.appendChild(noteForm);

storageUtils.initStorage();

storageUtils.getNotes().forEach(note => {
  const noteElement = createNoteElement(note.title, note.content, () => {
    storageUtils.removeNoteById(note.uniqueId);
  });
  noteForm.after(noteElement);
});