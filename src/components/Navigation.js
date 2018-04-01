import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Nav,
  Col,
  Container,
  Row,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

import SignOut from './SignOut';
import * as routes from '../constants/routes';

import DashboardPage from '../containers/DashboardPage';
import AddOrderPage from '../containers/AddOrderPage';

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
    main: () => <AddOrderPage />
  },
  {
    path: '/help',
    exact: true,
    sidebar: () => <div>help</div>,
    main: () => <h2>Help</h2>
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

class SideBarNav extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };

    this.toggleSideBarMenu = this.toggleSideBarMenu.bind(this);
  }

  toggleSideBarMenu() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    let pushMenu = this.state.isClicked ? 'clicked wrapper' : 'wrapper';
    return (
      <Router>
        <Container fluid>
          <Row>
            <div className={pushMenu}>
              <div className="side-bar">
                <ul>
                  <li className="menu-head">
                    trackmate<Button
                      className="push-menu pull-right"
                      onClick={this.toggleSideBarMenu}
                    >
                      <i className="fa fa-bars" />
                    </Button>
                  </li>
                  <div className="menu">
                    <li>
                      <Link to="/dashboard">
                        Dashboard<i className="fa fa-compass pull-right" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/add">
                        Add Order<i className="fa fa-plus pull-right" />
                      </Link>
                    </li>
                    <div className="menu-push-down">
                      <li>
                        <Link to="/help">
                          Help<i className="fa fa-info-circle pull-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings">
                          Settings<i className="fa fa-cogs pull-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/billing">
                          Billing<i className="fa fa-credit-card pull-right" />
                        </Link>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
              <div className="content">
                <Col>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <SignOut />
                    </div>
                    <div className="panel-body">
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
                </Col>
              </div>
            </div>
          </Row>
        </Container>
      </Router>
    );
  }
}

Container.propTypes = {
  fluid: PropTypes.bool
  // applies .container-fluid class
};

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
