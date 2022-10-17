import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../@types/user';
import { RootState, AppThunk } from '../app/store';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
});

interface UserState {
  users: IUser[];
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
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addUser(state, action: PayloadAction<IUser>) {
      state.users.unshift(action.payload);
    },
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

export const { deleteUser, addUser } = usersSlice.actions;

export default usersSlice.reducer;
