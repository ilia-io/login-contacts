import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { postUsers } from '../features/asyncActions';
import { getId } from './Contacts';
import { setCurrentUser } from '../features/usersSlice';
import Loader from '../components/Loader/Loader';
//import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const dispatch = useAppDispatch();
  //const auth = getAuth();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.usersReducer);

  //type TLogin = (email: string, pass: string) => void;

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      postUsers({
        id: getId(),
        name: name,
        email: email,
        password: pass,
      })
    );
    dispatch(
      setCurrentUser({
        id: 0,
        name: name,
        email: email,
        password: pass,
      })
    );
    navigate('/');
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.main}>
          <h1>Регистрация</h1>
          <form onSubmit={handleLogin}>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Имя"
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Емейл"
              required
            />
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              type="password"
              placeholder="Пароль"
              required
            />
            <button type="submit">Регистрация</button>
            <Link to={'/login'}>Уже есть аккаунт?</Link>
          </form>
        </main>
      )}
    </div>
  );
};

export default Register;
