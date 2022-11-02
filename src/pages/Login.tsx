import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IUser } from '../@types/user';
import { setCurrentUser } from '../features/usersSlice';
import { getId } from './Contacts';
import Loader from '../components/Loader/Loader';
//import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useAppDispatch();
  //const auth = getAuth();
  const navigate = useNavigate();

  //type TLogin = (email: string, pass: string) => void;

  const { users , isLoading} = useAppSelector((state) => state.usersReducer);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userExist = users.find((user) => user.email === email);
    const isValid = userExist?.name === pass;

    if (!userExist) {
      alert('Пользователь не найден!');
    } else {
      if (isValid) {
        dispatch(
          setCurrentUser({
            id: 1000,
            name: '',
            email: email,
            password: pass,
          })
        );
        navigate('/');
      } else {
        alert('Неправильный емейл или пароль');
      }
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.main}>
          <h1>Логин</h1>
          <form onSubmit={handleLogin}>
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
            <button type="submit">Логин</button>
            <Link to={'/register'}>Создать новый аккаунт</Link>
          </form>
        </main>
      )}
    </div>
  );
};

export default Login;
