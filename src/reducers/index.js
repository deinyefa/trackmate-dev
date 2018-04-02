import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import AuthReducer from './AuthReducer';
import MerchantReducer from './MerchantReducer';

export default combineReducers({
  auth: AuthReducer,
  form: formReducer,
  merchant: MerchantReducer,
  firebase: firebaseStateReducer,
  firestore: firestoreReducer
});
