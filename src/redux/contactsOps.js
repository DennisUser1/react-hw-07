import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://670bf4af7e5a228ec1cf2710.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (item, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", item);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            await axios.delete(`/contacts/${contactId}`); 
            return contactId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const restoreContact = createAsyncThunk(
    "contacts/restoreContact",
    async (contact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", contact); 
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);