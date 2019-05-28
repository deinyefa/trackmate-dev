import React, { Component } from "react";
import { Container } from "reactstrap";

import { withAuthentication } from "../../components/Session";
import RecentOrders from "./RecentOrders";
import Stats from "./Stats";

class DashboardPage extends Component {
	state = {
		merchantInfo: null,
		merchantCustomers: [],
		currentMerchant: null,
		totalOrders: 0,
	};

	componentDidMount = () => {
		const { firebase } = this.props;
		const { merchantCustomers } = this.state;

		let currentMerchant = firebase.auth.currentUser.uid;
		this.setState({ currentMerchant });

		let customersRef = firebase.db
			.collection("companies")
			.doc(currentMerchant)
			.collection("customers");

		customersRef
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					merchantCustomers.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				this.setState({
					merchantCustomers,
					totalOrders: this.state.merchantCustomers.length,
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Container>
				<Stats totalOrders={this.state.totalOrders} />
				<RecentOrders
					currentMerchant={this.state.currentMerchant}
					merchantCustomers={this.state.merchantCustomers}
				/>
			</Container>
		);
	}
}

export default withAuthentication(DashboardPage);
