import {
  SIGNUP_VALUES,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  companyName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_VALUES:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SIGNUP_SUCCESS:
      return { ...state };
    case SIGNUP_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
