import { browserHistory } from 'react-router'
import { SIGNUP_VALUES, SIGNUP_SUCCESS, SIGNUP_FAILED } from './types';
import { auth } from '../firebase';

export const signupValues = ({ prop, value }) => {
  return {
    type: SIGNUP_VALUES,
    payload: { prop, value }
  };
};

export const signUp = ({ email, password }) => {
  return dispatch => {
    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        dispatch({ type: SIGNUP_SUCCESS, payload: authUser });
      })
      .catch(error => {
        dispatch({ type: SIGNUP_FAILED, payload: error.message });
      });
  };
};
