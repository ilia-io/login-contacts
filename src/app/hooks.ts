import { usersSlice } from './../features/usersSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth() {
  const { id, name, email } = useAppSelector(
    (state) => state.usersReducer.currentUser
  );
  return {
    isAuth: !!email,
    id,
    name,
    email,
  };
}

// export function useAuth() {
//   const { email, token, id } = useAppSelector((state) => state.loginSlice);
//   return {
//     isAuth: !!email,
//     email,
//     token,
//     id,
//   };
// }
