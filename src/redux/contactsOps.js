import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://670bf4af7e5a228ec1cf2710.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get("/contacts");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (item, thunkAPI) => {
        try {
            const { data } = await axios.post("/contacts", item);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/contacts/${contactId}`);
            return data.id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);