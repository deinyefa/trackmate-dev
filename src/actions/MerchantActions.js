import { firebase } from '../firebase';
import moment from 'moment';
import {
  GET_CURRENT_USER,
  ADD_ORDER_VALUES,
  EXISTING_ID,
  ADD_ORDER_SUCCESS
} from './types';

export const getCurrentUser = () => {
  return dispatch => {
    let merchantInfo;
    firebase.db
      .collection('companies')
      .doc(firebase.auth.currentUser.uid)
      .get()
      .then(doc => {
        merchantInfo = doc.data();
        dispatch({ type: GET_CURRENT_USER, payload: merchantInfo });
      });
  };
};

export const inputAnOrder = ({ prop, value }) => {
  return {
    type: ADD_ORDER_VALUES,
    payload: { prop, value }
  };
};

export const addAnOrder = (orderID, lastName, firstName, orderStatus) => {
  return dispatch => {
    let customerData = {
      orderID,
      lastName,
      firstName,
      orderStatus,
      updatedOn: moment().format('MMM D, YYYY')
    };
    let customersRef = firebase.db
      .collection('companies')
      .doc(firebase.auth.currentUser.uid)
      .collection('customers')
      .doc(orderID);

    customersRef
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch({
            type: EXISTING_ID,
            payload: 'Oh no! Looks like something went wrong.'
          });
        } else {
          customersRef.set(customerData);
          dispatch({
            type: ADD_ORDER_SUCCESS,
            payload: 'Order has successfully been added'
          });
        }
      })
      .catch(error => console.log('error getting document: ', error));
  };
};
