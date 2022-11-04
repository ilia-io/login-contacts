import React, { useEffect } from 'react';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import { useAppDispatch, useAuth } from './app/hooks';
import { fetchUsers } from './features/asyncActions';


const App: React.FC = () => {
  const { isAuth, email } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Contacts emailProp={email} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            isAuth ? (
              <Contacts emailProp={email} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
