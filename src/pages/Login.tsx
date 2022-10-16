import React from 'react';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  return (
    <div className="_container">
      <main style={styles}>
        <h1>Login</h1>
        <form action="submit">
            <input type="text" placeholder="Email" id="email" />
            <input type="password" placeholder="Password" id="password" />
            <button type="button">Login</button>
        </form>
      </main>
    </div>
  );
};

export default Login;
