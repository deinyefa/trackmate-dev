import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../App.css';

import Navigation from './Navigation';
import SignUpPage from '../containers/SignUpPage';
import SignInPage from './SignInPage';
import PasswordForgetPage from './PasswordForgetPage';
import LandingPage from './LandingPage';
import DashboardPage from './DashboardPage';
import HelpPage from './HelpPage';
import SettingsPage from './SettingsPage';
import BillingPage from './BillingPage';
import AddOrderPage from './AddOrderPage';

import * as routes from '../constants/routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />

          <hr />
          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route
            exact
            path={routes.DASHBOARD}
            component={() => <DashboardPage />}
          />
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
