import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IUser } from '../@types/user';
import { setCurrentUser } from '../features/usersSlice';
import { getId } from './Contacts';
//import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useAppDispatch();
  //const auth = getAuth();
  const navigate = useNavigate();

  //type TLogin = (email: string, pass: string) => void;

  const users = useAppSelector((state) => state.usersReducer.users);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userExist = users.find((user) => user.email === email);
    const isValid = userExist?.name === pass;

    if (!userExist) {
      alert('User not found!');
    } else {
      if (isValid) {
        dispatch(
          setCurrentUser({
            id: getId(),
            name: pass,
            email: email,
          })
        );
        navigate('/');
      } else {
        alert('Invalid Email or Password!');
      }
    }
  };

  return (
    <div className="container">
      <main className={styles.main}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            id="email"
            required
          />
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            placeholder="Password"
            id="password"
            required
          />
          <button type="submit">Login</button>
          <Link to={'/register'}>Create account</Link>
        </form>
      </main>
    </div>
  );
};

export default Login;
