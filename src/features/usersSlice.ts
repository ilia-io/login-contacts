import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../@types/user';
import { RootState, AppThunk } from '../app/store';
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

      state.currentUser.id = action.payload.id;
      state.currentUser.name = action.payload.name;
      state.currentUser.email = action.payload.email;
      state.currentUser.password = action.payload.password;
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

// deleteUser(state, action: PayloadAction<number>) {
//   state.users = state.users.filter((user) => user.id !== action.payload);
// },

// if(state.users) {

//   state.users.map((localUser) =>  action.payload.filter((serverUser) => serverUser.id === localUser.id)
//   );
// }

// addUser(state, action: PayloadAction<IUser>) {
//   state.users.unshift(action.payload);
// },

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
