import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import { useAppDispatch, useAuth } from './app/hooks';
import { fetchUsers } from './features/asyncActions';

const DefaultApp = () => (
  <div className="App">
    <header className="App-header">
      <Counter />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <span>
        <span>Learn </span>
        <a
          className="App-link"
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://redux.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://redux-toolkit.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux Toolkit
        </a>
        ,<span> and </span>
        <a
          className="App-link"
          href="https://react-redux.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Redux
        </a>
      </span>
    </header>
  </div>
);



const App: React.FC = () => {
  const { isAuth, email } = useAuth();
const dispatch = useAppDispatch()

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
