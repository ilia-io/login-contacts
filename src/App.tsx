import React from 'react';
import { Counter } from './features/counter/Counter';
import Contacts from './pages/Contacts';
import Login from './pages/Login';

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
  return (
    <div className="container">
      <Login />
      <Contacts />
      <Login />
      <Contacts />
      <Login />
    </div>
  );
};

export default App;
