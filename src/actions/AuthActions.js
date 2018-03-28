import { browserHistory } from 'react-router'
import { SIGNUP_VALUES } from './types';
import { auth } from '../firebase';

export const signupValues = ({ prop, value }) => {
  return {
    type: SIGNUP_VALUES,
    payload: { prop, value }
  };
};
