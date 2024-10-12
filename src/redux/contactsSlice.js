import initialContacts from '../db/contacts.json';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [...initialContacts],
  deletedContact: null,
  deletedContactIndex: null,
  wasLastDeleted: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(state, action) {
      state.deletedContact = null;
      state.deletedContactIndex = null;
      state.wasLastDeleted = false;

      state.items.unshift(action.payload); 
    },
    deleteContact(state, action) {
      const indexToDelete = state.items.findIndex(item => item.id == action.payload);
      const contactToDelete = state.items[indexToDelete];
      
      if (contactToDelete) {
        state.deletedContact = contactToDelete;
        state.deletedContactIndex = indexToDelete;
        state.wasLastDeleted = state.items.length == 1; 
        state.items.splice(indexToDelete, 1);
      }
    },
    undoDeleteContact(state) {
      if (state.deletedContact) {
        const newItems = [...state.items];
        if (state.wasLastDeleted) {
          newItems.push(state.deletedContact);
        } else {
          newItems.splice(state.deletedContactIndex, 0, state.deletedContact);
        }
        state.items = newItems;
        state.deletedContact = null;
        state.deletedContactIndex = null;
        state.wasLastDeleted = false;
      }
    },
  },
});

export const { addContact, deleteContact, undoDeleteContact } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export const selectDeletedContact = (state) => state.contacts.deletedContact;
export default contactsSlice.reducer;
