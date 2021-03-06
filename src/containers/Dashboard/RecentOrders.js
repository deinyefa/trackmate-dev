import React, { Component } from "react";
import { Row, Table, Col, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdQueue } from "react-icons/md";

import * as ROUTES from "../../constants/routes";

import TableStyles from "../../Styles/Table.module.css";
import { withAuthentication } from "../../components/Session";
import Spinner from "../../components/UI/Spinner/Spinner";

class RecentOrders extends Component {
	state = {
		orderStatus: "",
	};

	getRecentOrders = () => {
		const updatedMerchantCustomers = [...this.props.merchantCustomers];
		return updatedMerchantCustomers
			.sort(obj => obj.data.createdAt)
			.slice(0, 5);
	};

	updateOrderStatus = (id, value) => {
		const { currentMerchant, firebase } = this.props;
		let customersRef = firebase.db
			.collection("companies")
			.doc(currentMerchant)
			.collection("customers");

		customersRef
			.doc(id)
			.update({
				orderStatus: value,
				updatedOn: new Date(),
			})
			.catch(err => console.log(err));

		this.setState({ orderStatus: value });
	};

	render() {
		let recentOrders = (
			<tr>
				<td colSpan="6">
					<Spinner />
				</td>
			</tr>
		);
		if (this.props.merchantCustomers.length > 0) {
			recentOrders = this.getRecentOrders().map(customer => (
				<tr key={customer.id}>
					<th scope="row">{customer.id}</th>
					<td>{customer.data.firstName}</td>
					<td>{customer.data.lastName}</td>
					<td>
						<select
							type="select"
							className={TableStyles.CustomSelect}
							value={customer.data.orderStatus}
							// defaultValue={this.state.orderStatus}
							onChange={event =>
								this.updateOrderStatus(
									customer.id,
									event.target.value
								)
							}>
							<option value="">-- Select --</option>
							<option value="recieved">Order Recieved</option>
							<option value="processed">Order Processed</option>
							<option value="production">Production</option>
							<option value="shipping">
								Scheduled for Shipping
							</option>
							<option value="outForDelivery">
								Out for Delivery
							</option>
							<option value="delivered">Delivered</option>
						</select>
					</td>
					<td>
						{moment(customer.data.updatedOn.toDate()).format(
							"MMM D YYYY, HH:mm:ss"
						)}
					</td>
					<td>
						{moment(customer.data.createdAt.toDate()).format(
							"MMM D YYYY, HH:mm:ss"
						)}
					</td>
				</tr>
			));
		}

		return (
			<Row className="orders-table">
				<Col md={12} className="card">
					<CardHeader
						className="table-header"
						data-background-color="blue">
						<h2 className="title">Recent Orders</h2>
						<p className="category">
							View your 5 most recent orders here
						</p>
					</CardHeader>
					<CardBody className="card-content table-responsive">
						<Table
							responsive
							size="sm"
							className={TableStyles.Table}>
							<thead
								className={`text-primary ${TableStyles.Thead}`}>
								<tr>
									<th>Order ID</th>
									<th className="wider">First Name</th>
									<th className="wider">Last Name</th>
									<th>Order Status</th>
									<th>Updated</th>
									<th>Created</th>
								</tr>
							</thead>
							<tbody className={TableStyles.Tbody}>
								{recentOrders}
							</tbody>
						</Table>
					</CardBody>
					<CardFooter className="text-center table-footer">
						<div className="text-primary mt-3 stats">
							<Link to={ROUTES.ORDERS}>
								<i className="material-icons">
									<MdQueue />
								</i>
								View All
							</Link>
						</div>
					</CardFooter>
				</Col>
			</Row>
		);
	}
}

export default withAuthentication(RecentOrders);
