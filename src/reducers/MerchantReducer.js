import {
  GET_CURRENT_USER,
  ADD_ORDER_VALUES,
  EXISTING_ID,
  ADD_ORDER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  merchantInfo: {},
  orderID: '',
  firstName: '',
  lastName: '',
  orderStatus: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, merchantInfo: action.payload };
    case ADD_ORDER_VALUES:
      console.log(state);
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case EXISTING_ID:
      return {
        ...state,
        orderError: action.payload,
        orderID: '',
        lastName: '',
        firstName: '',
        orderStatus: ''
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orderAdded: action.payload,
        orderID: '',
        lastName: '',
        firstName: '',
        orderStatus: ''
      };
    default:
      return state;
  }
};
