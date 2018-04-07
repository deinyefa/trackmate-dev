import {
  GET_CURRENT_USER,
  ADD_ORDER_VALUES,
  EXISTING_ID,
  ADD_ORDER_SUCCESS,
  ORDERS_LIST,
  UPDATE_ORDER
} from '../actions/types';

const INITIAL_STATE = {
  merchantInfo: {},
  orderID: '',
  firstName: '',
  lastName: '',
  orderStatus: '',
  merchantCustomers: []
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
        trackmateURL: `https://trackmate.com/${state.lastName.toLowerCase()}/${
          state.orderID
        }`,
        orderID: '',
        lastName: '',
        firstName: '',
        orderStatus: ''
      };
    case ORDERS_LIST:
      return { ...state, merchantCustomers: action.payload };
    case UPDATE_ORDER:
      let newMerchantCustomers = state.merchantCustomers;
      let updateIndex = newMerchantCustomers
        .map(item => {
          return item.id;
        })
        .indexOf(action.payload.id);

      newMerchantCustomers[updateIndex].data.orderStatus = action.payload.value;
      console.log(newMerchantCustomers[updateIndex].data.orderStatus);

      return { ...state, merchantCustomers: newMerchantCustomers };
    default:
      return { ...state, orderAdded: null, orderError: null };
  }
};
