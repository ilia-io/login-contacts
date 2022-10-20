import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../features/loginSlice';
import { postUsers } from '../features/asyncActions';
import { getId } from './Contacts';
import { setCurrentUser } from '../features/usersSlice';
//import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useAppDispatch();
  //const auth = getAuth();
  const navigate = useNavigate();

  type TLogin = (email: string, pass: string) => void;

  const handleLogin: TLogin = (email, pass) => {
    dispatch(
      setCurrentUser({
        id: getId(),
        name: pass,
        email: email,
      })
    );
    dispatch(
      postUsers({
        id: getId(),
        name: pass,
        email: email,
      })
    );
    navigate('/');
  };

  return (
    <div className="container">
        <main className={styles.main}>
          <h1>Register</h1>
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
              Register
            </button>
            <Link to={'/login'}>Log in</Link>
          </form>
        </main>
      </div>
  );
};

export default Register;
