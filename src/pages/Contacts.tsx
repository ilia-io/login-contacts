import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeUser } from '../features/loginSlice';
import { deleteUser, fetchUsers, addUser } from '../features/usersSlice';
import styles from './Contacts.module.scss';

interface IContacts {
  id: number;
  name: string;
  email: string;
}

interface IContactsProps {
  emailProp: string | null;
}

const Contacts: React.FC<IContactsProps> = ({ emailProp }) => {
  //const [userData, setuserData] = useState<IContacts[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [fromInputName, setfromInputName] = useState('');
  const [fromInputEmail, setfromInputEmail] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useAppDispatch();
  const { users, error, status } = useAppSelector(
    (state) => state.usersReducer
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAddUserButton = () => {
    dispatch(
      addUser({ id: getId(), name: fromInputName, email: fromInputEmail })
    );
    setfromInputName('');
    setfromInputEmail('');
    setModal(false);
  };

  const Modal = () => {
    return (
      <div className={modal ? 'overlay' : 'overlay animated'}>
        <div className="modal">
          <svg
            onClick={() => setModal(false)}
            height="200"
            viewBox="0 0 200 200"
            width="200"
          >
            <title />
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
          </svg>

          <h3>Добавить пользователя</h3>
          <form>
            <span>Имя </span>
            <input
              value={fromInputName}
              onChange={(e) => setfromInputName(e.target.value)}
              type="text"
            />
            <span>Емейл</span>
            <input
              value={fromInputEmail}
              onChange={(e) => setfromInputEmail(e.target.value)}
              type="email"
            />
            <button onClick={handleAddUserButton} type="button">
              Добавить
            </button>
          </form>
        </div>
      </div>
    );
  };

  const getId = () => new Date().valueOf();

  return (
    <div className="container">
      <div className="_container">
        <main style={styles}>
          <button onClick={() => dispatch(removeUser())} type="button">
            Log out from {emailProp}
          </button>
          <div className="title">
            <h1>Contacts</h1>
            <button onClick={() => setModal(true)} type="button">
              <img src="assets/add.png" alt="add icon" />
            </button>
          </div>
          <div className="search">
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
                    user.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((user) => (
                  <li key={user.id}>
                    <div>
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <button type="button">
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
          {Modal()}
        </main>
      </div>
    </div>
  );
};

export default Contacts;
