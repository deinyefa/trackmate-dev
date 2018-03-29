import React from 'react';
import { Link } from 'react-router-dom';

import SignOut from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <AuthNavigation /> : <NonAuthNavigation />}</div>
);

const AuthNavigation = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <SignOut />
    </li>
  </ul>
);

const NonAuthNavigation = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
  </ul>
);

export default Navigation;
