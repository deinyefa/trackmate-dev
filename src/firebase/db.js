import { db } from './firebase';

export const doCreateUser = (id, companyName, email) => {
  db
    .collection('companies')
    .doc(id)
    .set(
      {
        companyName,
        email
      },
      { merge: true }
    );
};

export const onGetUsers = () => db.ref('users').once('value');
