// eslint-disable-next-line no-unused-vars
'use strict';

const store = (function(){

  const findAndUpdate = (id, newData) => {
    const note = store.notes.find(note => note.id === id);
    Object.assign(note, newData);
  };

  return {
    notes: [],
    currentNote: false,
    currentSearchTerm: '',
    findAndUpdate,
  };
  
}());
