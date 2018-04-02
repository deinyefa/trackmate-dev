import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import AuthReducer from './AuthReducer';
import CustomerReducer from './CustomerReducer';

export default combineReducers({
  auth: AuthReducer,
  form: formReducer,
  firebase: firebaseStateReducer,
  firestore: firestoreReducer
});
