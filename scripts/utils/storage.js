const storage = localStorage;

export const storageUtils = {
  getNotes() {
    try {
      const notes = JSON.parse(storage.getItem('notes'));
      return notes;
    } catch {
      const emptyArray = [];
      this.saveNotes(emptyArray);
      return emptyArray;
    }
  },

  saveNotes(notes) {
    storage.setItem('notes', JSON.stringify(notes));
  },

  removeNoteById(id) {
    const notes = this.getNotes();
    const index = notes.findIndex(e => e.uniqueId === id);
    if (index >= 0) {  
      notes.splice(index, 1);
      this.saveNotes(notes);
    }
  },

  addNotes(note) {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  },

  initStorage() {
    if (storageUtils.getNotes() === null)
      storageUtils.saveNotes([]);    
  }
}
