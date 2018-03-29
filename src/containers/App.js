import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../App.css';

import Navigation from '../components/Navigation';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import LandingPage from '../components/LandingPage';
// import DashboardPage from '../components/DashboardPage';
import HelpPage from '../components/HelpPage';
import SettingsPage from '../components/SettingsPage';
import BillingPage from '../components/BillingPage';
import AddOrderPage from '../components/AddOrderPage';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { authUser: null };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          {/* <Route
            exact
            path={routes.DASHBOARD}
            component={() => <DashboardPage />}
          /> */}
          <Route
            exact
            path={routes.BILLING}
            component={() => <BillingPage />}
          />
          <Route
            exact
            path={routes.SETTINGS}
            component={() => <SettingsPage />}
          />
          <Route exact path={routes.HELP} component={() => <HelpPage />} />
          <Route
            exact
            path={routes.ADD_ORDER}
            component={() => <AddOrderPage />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
