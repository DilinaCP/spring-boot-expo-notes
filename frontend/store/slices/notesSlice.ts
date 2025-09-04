// store/slices/notesSlice.ts
import axios from 'axios';
import { createSlice, createAsyncThunk, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState } from '../../types';


const API_URL = "http://192.168.8.116:8090/api/notes"; 

export const fetchNotes = createAsyncThunk<Note[]>(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Note[]>(API_URL);
      return response.data;
    } catch (error: any) {
      console.error('Fetch notes error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addNote = createAsyncThunk<Note, Omit<Note, 'id'>>(
  'notes/addNote',
  async (note, { rejectWithValue }) => {
    try {
      const response = await axios.post<Note>(API_URL, note, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      console.error('Add note error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateNote = createAsyncThunk<Note, Note>(
  'notes/updateNote',
  async (note, { rejectWithValue }) => {
    try {
      const response = await axios.put<Note>(`${API_URL}/${note.id}`, note, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      console.error('Update note error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteNote = createAsyncThunk<number, number>(
  'notes/deleteNote',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error: any) {
      console.error('Delete note error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const initialState: NotesState = {
  items: [],
  loading: false,
  error: null,
};


const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const index = state.items.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((note) => note.id !== action.payload);
        state.loading = false;
        state.error = null;
      });

    // Pending matcher
    builder.addMatcher(
      isPending(fetchNotes, addNote, updateNote, deleteNote),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    // Rejected matcher
    builder.addMatcher(
      isRejected(fetchNotes, addNote, updateNote, deleteNote),
      (state, action: any) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Failed to process request';
      }
    );
  },
});

export const { clearError } = notesSlice.actions;
export default notesSlice.reducer;