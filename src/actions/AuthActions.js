import { EMAIL_CHANGED, SIGNUP_VALUES } from './types';

export const emailChanged = email => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  };
};

export const signupValues = ({ prop, value }) => {
  return {
    type: SIGNUP_VALUES,
    payload: { prop, value }
  };
};
