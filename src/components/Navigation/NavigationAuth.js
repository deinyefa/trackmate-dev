import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Navbar, Container } from "reactstrap";
import {
	MdDashboard,
	MdReceipt,
	MdAddBox,
	MdInfo,
	MdSettings,
	MdCreditCard,
	MdMenu,
} from "react-icons/md";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import SignOutButton from "../SignOut";
import NavigationAuthStyles from "./Navigation.module.css";

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
		let pushMenu = this.state.isClicked
			? [
					NavigationAuthStyles.Clicked,
					NavigationAuthStyles.Navigation,
			  ].join(" ")
			: NavigationAuthStyles.Navigation;
		const { merchantInfo } = this.state;

		return (
			<div className={pushMenu}>
				<div
					className={NavigationAuthStyles.Sidebar}
					data-color="purple">
					<div className={NavigationAuthStyles.Logo}>
						<p className={`${NavigationAuthStyles.SimpleText} `}>
							trackmate
							<span
								className={`${
									NavigationAuthStyles.ToggleSidebar
								} float-right`}
								onClick={this.toggleSideBarMenu}>
								<i className="material-icons float-right">
									<MdMenu />
								</i>
							</span>
						</p>
					</div>{" "}
					<div className="sidebar-wrapper">
						<ul className={NavigationAuthStyles.Nav}>
							<ListItemLink
								to={ROUTES.DASHBOARD}
								className={NavigationAuthStyles.Nav_Item}>
								<i className="material-icons float-right">
									<MdDashboard />
								</i>
								<p>Dashboard</p>
							</ListItemLink>
							<ListItemLink
								to={ROUTES.ORDERS}
								className={NavigationAuthStyles.Nav_Item}>
								<i className="material-icons float-right">
									<MdReceipt />
								</i>
								<p>Orders</p>
							</ListItemLink>
							<ListItemLink
								to={ROUTES.ADD_ORDER}
								className={NavigationAuthStyles.Nav_Item}>
								<i className="material-icons float-right">
									<MdAddBox />
								</i>
								<p>Add Order</p>
							</ListItemLink>
							<aside
								className={NavigationAuthStyles.MenuPushDown}>
								<ListItemLink
									to={ROUTES.HELP}
									className={NavigationAuthStyles.Nav_Item}>
									<i className="material-icons float-right">
										<MdInfo />
									</i>
									<p>Help</p>
								</ListItemLink>
								<ListItemLink
									to={ROUTES.SETTINGS}
									className={NavigationAuthStyles.Nav_Item}>
									<i className="material-icons float-right">
										<MdSettings />
									</i>
									<p>Settings</p>
								</ListItemLink>
								<ListItemLink
									to={ROUTES.BILLING}
									className={NavigationAuthStyles.Nav_Item}>
									<i className="material-icons float-right">
										<MdCreditCard />
									</i>
									<p>Billing</p>
								</ListItemLink>
								<div
									className={
										NavigationAuthStyles.SignOutButton
									}>
									<SignOutButton />
								</div>
							</aside>
						</ul>
					</div>
				</div>
				<div className={NavigationAuthStyles.MainPanel}>
					<Navbar
						className={`navbar-transparent navbar-absolute ${
							NavigationAuthStyles.NavBar
						}`}>
						<Container fluid>
							<div
								className="navbar-header"
								style={{ marginLeft: "auto " }}>
								<span
									className={
										NavigationAuthStyles.NavbarBrand
									}>
									{merchantInfo
										? merchantInfo.companyName
										: ""}
									<span className="ripple-container" />
								</span>
							</div>
						</Container>
					</Navbar>
					<section className={NavigationAuthStyles.Content}>
						<Container>
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
			<li className={match ? `${NavigationAuthStyles.active}` : ""}>
				<Link to={to} {...rest} className="nav-link" />
			</li>
		)}
	/>
);

export default withAuthentication(NavigationAuth);
