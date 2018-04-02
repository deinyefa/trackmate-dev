import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import 'firebase/firestore';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './containers/App';
import reducers from './reducers';
import { firebase } from './firebase';

const createStoreWithMiddleware = compose(
  applyMiddleware(reduxThunk),
  firebase.reactReduxWithFirestore(),
  firebase.reduxWithFirestore()
)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
