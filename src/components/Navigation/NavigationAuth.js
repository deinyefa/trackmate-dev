import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Navbar, Container } from "reactstrap";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from '../Session';
import SignOutButton from "../SignOut";

import DashboardPage from "../../containers/Dashboard";
import OrdersListPage from "../../containers/Orders/OrdersList";
import AddOrderPage from "../../containers/Orders/AddOrder";
import HelpPage from "../../containers/Help";
import SettingsPage from "../../containers/Settings";
import BillingPage from "../../containers/Billings";

const authRoutes = [
	{
		path: ROUTES.DASHBOARD,
		exact: true,
		sidebar: () => <div>dashboard</div>,
		main: () => <DashboardPage />,
	},
	{
		path: ROUTES.ORDERS,
		exact: true,
		sidebar: () => <div>orders</div>,
		main: () => <OrdersListPage />,
	},
	{
		path: ROUTES.ADD_ORDER,
		exact: true,
		sidebar: () => <div>add order</div>,
		main: () => <AddOrderPage />,
	},
	{
		path: ROUTES.HELP,
		exact: true,
		sidebar: () => <div>help</div>,
		main: () => <HelpPage />,
	},
	{
		path: ROUTES.SETTINGS,
		exact: true,
		sidebar: () => <div>settings!</div>,
		main: () => <SettingsPage />,
	},
	{
		path: ROUTES.BILLING,
		exact: true,
		sidebar: () => <div>billing!</div>,
		main: () => <BillingPage />,
	},
];

class NavigationAuth extends Component {
	state = {
		isClicked: false,
		marchantInfo: null,
	};

	componentDidMount = () => {
    const { firebase } = this.props;
		let currentMerchant = firebase.auth.currentUser.uid;

		firebase.db
			.collection("companies")
			.doc(currentMerchant)
			.get()
			.then(doc => {
				this.setState({ merchantInfo: doc.data() });
			})
			.catch(err => console.log(err));
	};

	toggleSideBarMenu = () =>
		this.setState({ isClicked: !this.state.isClicked });

	render() {
    let pushMenu = this.state.isClicked ? "clicked wrapper" : "wrapper";
    const { merchantInfo } = this.state;

		return (
			<div className={pushMenu}>
				<div className="sidebar" data-color="purple">
					<div className="logo">
						<p className="simple-text pull-right">
							trackmate
							<span
								className="toggle-sidebar pull-right"
								onClick={this.toggleSideBarMenu}
							/>
						</p>
					</div>
				</div>
				<div className="sidebar-wrapper">
					<ul className="nav">
						<ListItemLink
							to={ROUTES.DASHBOARD}
							className="nav-item">
							<p>Dashboard</p>
						</ListItemLink>
						<ListItemLink to={ROUTES.ORDERS} className="nav-item">
							<p>Orders</p>
						</ListItemLink>
						<ListItemLink
							to={ROUTES.ADD_ORDER}
							className="nav-item">
							<p>Add Order</p>
						</ListItemLink>
						<ListItemLink to={ROUTES.HELP} className="nav-item">
							<p>Help</p>
						</ListItemLink>
						<ListItemLink to={ROUTES.SETTINGS} className="nav-item">
							<p>Settings</p>
						</ListItemLink>
						<ListItemLink to={ROUTES.BILLING} className="nav-item">
							<p>Billing</p>
						</ListItemLink>
					</ul>
					<SignOutButton />
				</div>
				<div className="main-panel">
					<Navbar className="navbar-transparent navbar-absolute">
						<Container fluid>
							<div className="navbsr-header">
								<span className="navbar-brand">
                  { merchantInfo ? merchantInfo.companyName : ''}
									<span className="ripple-container" />
								</span>
							</div>
						</Container>
					</Navbar>
					<section className="content">
						<Container fluid>
							{authRoutes.map(route => (
								<Route
									key={route.path}
									path={route.path}
									exact={route.exact}
									component={route.main}
								/>
							))}
						</Container>
					</section>
				</div>
			</div>
		);
	}
}

const ListItemLink = ({ to, ...rest }) => (
	<Route
		path={to}
		children={({ match }) => (
			<li className={match ? "active" : ""}>
				<Link to={to} {...rest} className="nav-link" />
			</li>
		)}
	/>
);

export default withAuthentication(NavigationAuth);
