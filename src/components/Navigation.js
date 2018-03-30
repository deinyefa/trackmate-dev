import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';

import SignOut from './SignOut';
import * as routes from '../constants/routes';

import DashboardPage from '../components/DashboardPage';

const authRoutes = [
  {
    path: '/dashboard',
    exact: true,
    sidebar: () => <div>dashboard</div>,
    main: () => <DashboardPage />
  },
  {
    path: '/add',
    exact: true,
    sidebar: () => <div>add order</div>,
    main: () => <h2>Add Order</h2>
  },
  {
    path: '/settings',
    exact: true,
    sidebar: () => <div>settings!</div>,
    main: () => <h2>Settings</h2>
  },
  {
    path: '/billing',
    exact: true,
    sidebar: () => <div>billing!</div>,
    main: () => <h2>Billing</h2>
  }
];

const Navigation = ({ authUser }) => (
  <div>{authUser ? <SideBarNav /> : <NonAuthNavigation />}</div>
);

const SideBarNav = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div
        style={{
          padding: '10px',
          width: '40%',
          background: '#f0f0f0'
        }}
      >
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/dashboard">trackmate</Link>
          </li>
          <li>
            <Link to="/add">Add Order</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/billing">Billing</Link>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <SignOut />
        {authRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
);

// const AuthNavigation = () => (
//   <Navbar color="faded" light>
//     <NavbarBrand href={routes.LANDING}>trackmate</NavbarBrand>
//     <Nav className="ml-auto" navbar>
//       <NavItem>
//         <Link to={routes.DASHBOARD}>Dashboard</Link>
//       </NavItem>
//       <NavItem>
//         <SignOut />
//       </NavItem>
//     </Nav>
//   </Navbar>
// );

const NonAuthNavigation = () => (
  <Navbar color="faded" light>
    <NavbarBrand href={routes.LANDING}>trackmate</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link to={routes.SIGN_IN}>Sign In</Link>
      </NavItem>
    </Nav>
  </Navbar>
);

export default Navigation;
