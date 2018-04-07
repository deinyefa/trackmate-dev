import { firebase } from '../firebase';
import moment from 'moment';
import {
  GET_CURRENT_USER,
  ADD_ORDER_VALUES,
  EXISTING_ID,
  ADD_ORDER_SUCCESS,
  ORDERS_LIST,
  UPDATE_ORDER
} from './types';

export const getCurrentUser = () => {
  return dispatch => {
    let merchantInfo;
    let currentMerchant = firebase.auth.currentUser.uid;
    firebase.db
      .collection('companies')
      .doc(currentMerchant)
      .get()
      .then(doc => {
        merchantInfo = doc.data();
        dispatch({ type: GET_CURRENT_USER, payload: merchantInfo });
      });

    let customersRef = firebase.db
      .collection('companies')
      .doc(currentMerchant)
      .collection('customers');
    customersRef.get().then(querySnapshot => {
      let merchantCustomers = [];
      querySnapshot.forEach(doc => {
        merchantCustomers.push({ id: doc.id, data: doc.data() });
      });
      dispatch({ type: ORDERS_LIST, payload: merchantCustomers });
      // console.log(merchantCustomers);
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
      updatedOn: moment().format('MMMM Do YYYY, h:mm:ss a')
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
            payload:
              "Order has successfully been added, find your customer's trackmate notification url below"
          });
        }
      })
      .catch(error => console.log('Error getting document: ', error));
  };
};

export const updateOrderStatus = (id, value) => {
  return dispatch => {
    let currentMerchant = firebase.auth.currentUser.uid;

    firebase.db
      .collection('companies')
      .doc(currentMerchant)
      .collection('customers')
      .doc(id)
      .update({
        orderStatus: value,
        updatedOn: moment().format('MMMM Do YYYY h:mm:ss a')
      })
      .then(() => {
        dispatch({ type: UPDATE_ORDER, payload: { id, value } });
      })
      .catch(error => console.log('Error updating document: ', error));
  };
};
