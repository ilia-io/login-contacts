import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUser } from '../features/loginSlice';
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

  type TLogin = (email: string, pass: string) => void;

  const users = useAppSelector((state) => state.usersReducer.users);

  const handleLogin: TLogin = (email, pass) => {
    const userExist = users.find((user) => user.email === email);
    const isValid = userExist?.name === pass;
    console.log(isValid);

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

    if (isValid) {
      dispatch(
        setCurrentUser({
          id: getId(),
          name: pass,
          email: email,
        })
      );
      navigate('/');
    }
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
