import { db } from './firebase';

export const doCreateUser = (id, companyName, email) => {
  db.ref(`users/${id}`).set({
    companyName,
    email
  });
};

export const onGetUsers = () => db.ref('users').once('value');
