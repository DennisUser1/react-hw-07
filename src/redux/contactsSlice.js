import { createSelector, createSlice } from "@reduxjs/toolkit"; 
import { fetchContacts, addContact, deleteContact, restoreContact } from "./contactsOps.js";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,

  deletedContact: null,
  deletedContactIndex: null,
  wasLastDeleted: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const indexToDelete = state.items.findIndex(contact => contact.id == action.payload);
        if (indexToDelete == -1) {
          console.error("Contact not found for deletion:", action.payload);
          return;
        }
        const contactToDelete = state.items[indexToDelete];
        
        if (contactToDelete) {
          state.deletedContact = contactToDelete;
          state.deletedContactIndex = indexToDelete;
          state.wasLastDeleted = state.items.length == 1; 
          state.items.splice(indexToDelete, 1);
        }

        state.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(restoreContact.fulfilled, (state, action) => {
        state.items.push(action.payload); 
        state.deletedContact = null; 
        state.deletedContactIndex = null;
        state.wasLastDeleted = false;
      });
  },
});

export const { undoDeleteContact } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export const selectIsError = (state) => state.contacts.isError;
export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;
