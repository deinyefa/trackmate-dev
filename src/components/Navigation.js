import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';

import SignOut from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <AuthNavigation /> : <NonAuthNavigation />}</div>
);

const AuthNavigation = () => (
  <Navbar color="faded" light>
    <NavbarBrand href={routes.LANDING}>trackmate</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link to={routes.DASHBOARD}>Dashboard</Link>
      </NavItem>
      <NavItem>
        <SignOut />
      </NavItem>
    </Nav>
  </Navbar>
);

const NonAuthNavigation = () => (
  <NavbarBrand color="faded" light>
    <NavbarBrand href={routes.LANDING}>trackmate</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link to={routes.SIGN_IN}>Sign In</Link>
      </NavItem>
    </Nav>
  </NavbarBrand>
);

export default Navigation;
