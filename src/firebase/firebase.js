import * as firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID
} from './variables';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

var config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// initialize firebase database
const db = firebase.firestore();

const auth = firebase.auth();
const reactReduxWithFirestore = () => reactReduxFirebase(firebase, rrfConfig);
const reduxWithFirestore = () => reduxFirestore(firebase);

export { db, auth, reactReduxWithFirestore, reduxWithFirestore };
