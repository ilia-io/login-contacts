import React from 'react';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  return (
    <main style={styles}>
      <h1>Login</h1>
      <form action="submit">
        <div>
          <input type="text" placeholder="Email" id="email" />
        </div>
        <div>
          <input type="password" placeholder="Password" id="password" />
        </div>
        <div>
          <button type="button">Login</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
