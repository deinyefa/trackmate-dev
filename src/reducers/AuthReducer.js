import { EMAIL_CHANGED, SIGNUP_VALUES } from '../actions/types';

const INITIAL_STATE = {
  companyName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case SIGNUP_VALUES:
      return { ...state, [action.payload.prop]: [action.payload.value] };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
