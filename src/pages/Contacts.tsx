import React, { useEffect, useId, useState } from 'react';
import { IUser } from '../@types/user';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers, postUsers } from '../features/asyncActions';
import { removeCurrentUser } from '../features/usersSlice';
import { deleteUser } from '../features/usersSlice';
import styles from './Contacts.module.scss';

interface IContacts {
  id: number;
  name: string;
  email: string;
}

interface IContactsProps {
  emailProp: string | null;
}

export const getId = () => new Date().valueOf();

const Contacts: React.FC<IContactsProps> = ({ emailProp }) => {
  //const [userData, setuserData] = useState<IContacts[]>([]);
  const [addModalState, setAddModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);
  const [fromInputName, setfromInputName] = useState('');
  const [fromInputEmail, setfromInputEmail] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useAppDispatch();
  const { users, error, isLoading } = useAppSelector(
    (state) => state.usersReducer
  );

  const handleAddUserButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(
    //   addUser({ id: getId(), name: fromInputName, email: fromInputEmail })
    // );
    dispatch(
      postUsers({
        id: getId(),
        name: fromInputName,
        email: fromInputEmail,
      })
    );
    setfromInputName('');
    setfromInputEmail('');
    setAddModalState(false);
  };

  const handleEditUserButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setfromInputName('');
    setfromInputEmail('');
    setEditModalState(false);
  };

  const onClickEdit = (user: IUser) => {
    setfromInputName(user.name);
    setfromInputEmail(user.email);
    setEditModalState(true);
  };

  const logOut = () => {
    dispatch(removeCurrentUser());
  };

  const addModal = () => {
    return (
      <div className={addModalState ? 'overlay' : 'overlay animated'}>
        <div className="modal">
          <svg
            onClick={() => setAddModalState(false)}
            height="200"
            viewBox="0 0 200 200"
            width="200"
          >
            <title />
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
          </svg>
          <h3>Добавить пользователя</h3>
          <form onSubmit={handleAddUserButton}>
            <span>Имя </span>
            <input
              value={fromInputName}
              onChange={(e) => setfromInputName(e.target.value)}
              type="text"
              required
            />
            <span>Емейл</span>
            <input
              value={fromInputEmail}
              onChange={(e) => setfromInputEmail(e.target.value)}
              type="email"
              required
            />
            <button type="submit">Добавить</button>
          </form>
        </div>
      </div>
    );
  };
  const editModal = () => {
    return (
      <div className={editModalState ? 'overlay' : 'overlay animated'}>
        <div className="modal">
          <svg
            onClick={() => setEditModalState(false)}
            height="200"
            viewBox="0 0 200 200"
            width="200"
          >
            <title />
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
          </svg>
          <h3>Редактировать пользователя</h3>
          <form onSubmit={handleEditUserButton}>
            <span>Имя </span>
            <input
              value={fromInputName}
              onChange={(e) => setfromInputName(e.target.value)}
              type="text"
              required
            />
            <span>Емейл</span>
            <input
              value={fromInputEmail}
              onChange={(e) => setfromInputEmail(e.target.value)}
              type="email"
              required
            />
            <button type="submit">Изменить</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <main className={styles.main}>
        <button onClick={() => logOut()} type="button">
          Log out from {emailProp}
        </button>
        <div className={styles.title}>
          <h1>Contacts</h1>
          <button onClick={() => setAddModalState(true)} type="button">
            <img src="assets/add.png" alt="add icon" />
          </button>
        </div>
        <div className={styles.search}>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              height="26px"
              width="26px"
              src="./assets/x_icon.png"
              alt="x icon"
            />
          )}
        </div>

        <section>
          <ul>
            {users
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((user) => (
                <li key={user.id}>
                  <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <button onClick={() => onClickEdit(user)} type="button">
                      <img src="assets/edit.png" alt="edit icon" />
                    </button>
                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      type="button"
                    >
                      <img src="assets/remove.png" alt="remove icon" />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </section>
        {addModal()}
        {editModal()}
      </main>
    </div>
  );
};

export default Contacts;
