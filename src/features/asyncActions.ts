import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../@types/user';

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
    }
  }
);

export const postUsers = createAsyncThunk(
  'user/post',
  async (userData: IUser, thunkAPI) => {
    try {
      const response = await axios.post<IUser>(
        'https://jsonplaceholder.typicode.com/users',
        {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
    }
  }
);
