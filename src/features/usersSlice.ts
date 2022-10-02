import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  const data = await response.json();

  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
    error: null,
  },
  reducers: {
    userReducer: () => {},
  },
  extraReducers: {
    // [fetchUsers.pending]: (state, action) => {},
    // [fetchUsers.fulfilled]: (state, action) => {},
    // [fetchUsers.rejected]: (state, action) => {},
  },
});
