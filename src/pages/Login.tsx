import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../features/loginSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useAppDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  type TLogin = (email: string, pass: string) => void;

  const handleLogin: TLogin = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            // @ts-ignore
            token: user.accessToken,
          })
        );
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <div className="_container">
        <main style={styles}>
          <h1>Login</h1>
          <form action="submit">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              id="email"
            />
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              type="password"
              placeholder="Password"
              id="password"
            />
            <button onClick={() => handleLogin(email, pass)} type="button">
              Login
            </button>
            <Link to={'/register'}>Create account</Link>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
