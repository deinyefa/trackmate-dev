import { SIGNUP_VALUES } from './types';

export const signupValues = ({ prop, value }) => {
  return {
    type: SIGNUP_VALUES,
    payload: { prop, value }
  };
};
