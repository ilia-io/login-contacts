import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../@types/user';
import { RootState, AppThunk } from '../app/store';
import { fetchUsers, postUsers } from './asyncActions';

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
  },
};

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
}

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
    setCurrentUser(state, action: PayloadAction<IUser>) {
      state.currentUser.id = action.payload.id;
      state.currentUser.name = action.payload.name;
      state.currentUser.email = action.payload.email;
    },
    removeCurrentUser(state) {
      state.currentUser.id = 0;
      state.currentUser.name = '';
      state.currentUser.email = '';
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
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(postUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.users.unshift(action.payload);
    });
    builder.addCase(postUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { deleteUser, addUser, setCurrentUser, removeCurrentUser } =
  usersSlice.actions;

export default usersSlice.reducer;

// extraReducers: {
//   [fetchUsers.pending.type]: (state) => {
//     state.isLoading = true;
//   },
//   [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
//     state.isLoading = false;
//     state.error = '';
//     state.users = action.payload;
//   },
//   [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
// },

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await response.json();
//   return data;
// });

//   extraReducers: {
//     [fetchUsers.pending.type]: (state) => {
//       state.status = 'loading';
//       state.error = null;
//     },
//     [fetchUsers.fulfilled.type]: (state, action) => {
//       state.users = action.payload;
//       state.status = 'success';
//     },
//     [fetchUsers.rejected.type]: (state) => {
//       state.status = 'error';
//       state.users = [];
//     },
//   },

// interface UserState {
//   users: IUser[];
//   status: 'loading' | 'success' | 'error';
//   error: null | string;
// }

// const initialState: UserState = {
//   users: [],
//   status: 'loading',
//   error: null,
// };
