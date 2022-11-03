import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../@types/user';
import { deleteUsers, fetchUsers, postUsers, putUsers } from './asyncActions';

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string | unknown;
  currentUser: ICurrentUser;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
  currentUser: {
    id: 0,
    name: '',
    email: '',
    password: '',
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<ICurrentUser>) {
      state.currentUser.id = action.payload.id;
      state.currentUser.name = action.payload.name;
      state.currentUser.email = action.payload.email;
      state.currentUser.password = action.payload.password;
    },
    removeCurrentUser(state) {
      state.currentUser.id = 0;
      state.currentUser.name = '';
      state.currentUser.email = '';
      state.currentUser.password = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(postUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.users.push(action.payload);
    });
    builder.addCase(postUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(putUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(putUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? (user = action.payload) : user
      );
    });
    builder.addCase(putUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setCurrentUser, removeCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
