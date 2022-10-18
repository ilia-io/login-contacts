import usersReducer from './../features/usersSlice';
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginSlice from '../features/loginSlice';

// const rootReducer = combineReducers({
//   counter: counterReducer,
//   usersReducer,
// });

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    usersReducer,
    loginSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
