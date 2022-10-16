import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/usersSlice';
import styles from './Contacts.module.scss';

interface IContacts {
  id: number;
  username: string;
  name: string;
  email: string;
}

const Contacts: React.FC = () => {
  const [userData, setuserData] = useState<IContacts[]>([]);
  const dispatch = useAppDispatch();
  const { users, error, status } = useAppSelector(
    (state) => state.usersReducer
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="_container">
      <main style={styles}>
        <div>
          <h1>Contacts</h1>
          <button type="button">
            <img src="assets/add.png" alt="add icon" />
          </button>
        </div>
        <input type="text" placeholder="Поиск..." />
        <section>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <button type="button">
                    <img src="assets/edit.png" alt="edit icon" />
                  </button>
                  <button type="button">
                    <img src="assets/remove.png" alt="remove icon" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Contacts;
