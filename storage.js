const storage = localStorage;

export const storageUtils = {
  getNotes() {
    const notes = JSON.parse(storage.getItem('notes'));
    return notes;
  },

  saveNotes(notes) {
    storage.setItem('notes', JSON.stringify(notes));
  },

  removeNoteById(id) {
    const notes = this.getNotes();
    const index = notes.findIndex(e => e.id === id);
    notes.splice(index, 1);
    this.saveNotes(notes);
  },

  addNotes(note) {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  }
} 