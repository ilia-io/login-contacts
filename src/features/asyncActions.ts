import { useAppDispatch } from './../app/hooks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../@types/user';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(API_URL!);
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
      const response = await axios.post<IUser>(API_URL!, {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось добавить пользователя');
    }
  }
);

export const putUsers = createAsyncThunk(
  'user/put',
  async (userData: IUser, thunkAPI) => {
    try {
      const response = await axios.put<IUser>(`${API_URL!}/${userData.id}`, {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось обновить данные');
    }
  }
);

export const deleteUsers = createAsyncThunk(
  'user/delete',
  async (userData: IUser, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL!}/${userData.id}`);
      return userData.id;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось удалить пользователя');
    }
  }
);
