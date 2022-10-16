import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  const data = await response.json();

  return data;
});

interface UserState {
  users: any[];
  status: 'loading' | 'success' | 'error';
  error: null | string;
}

const initialState: UserState = {
  users: [],
  status: 'loading',
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      state.users = action.payload;
      state.status = 'success';
    },
    [fetchUsers.rejected.type]: (state) => {
      state.status = 'error';
      state.users = [];
    },
  },
});

export default usersSlice.reducer;
