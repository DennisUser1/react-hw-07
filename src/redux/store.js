import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice.js";
import filtersReducer from "./filtersSlice.js";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});