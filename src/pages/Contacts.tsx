import React, { useEffect, useState } from 'react';
import styles from './Contacts.module.scss';

interface IContacts {
  id: number;
  username: string;
  name: string;
  email: string;
}

const Contacts: React.FC = () => {
  const [userData, setuserData] = useState<IContacts[]>([]);
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => response.json())
  //     .then((json) => setuserData(json));
  // }, []);

  return (
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
          <li>
            <div>
              <p>Leonel Messi</p>
              <p>messi@gmail.com</p>
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
          <li>
            <div>
              <p>Leonel Messi</p>
              <p>messi@gmail.com</p>
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
        </ul>
      </section>
    </main>
  );
};

export default Contacts;
