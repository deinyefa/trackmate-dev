import React, { Component } from "react";
import { Row, Table, Col, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

import { withAuthentication } from "../../components/Session";
import * as ROUTES from "../../constants/routes";

class RecentOrders extends Component {
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
	};

	render() {
		let recentOrders = this.getRecentOrders().map(customer => (
			<tr key={customer.id}>
				<th scope="row">{customer.id}</th>
				<td>{customer.data.firstName}</td>
				<td>{customer.data.lastName}</td>
				<td>
					<select
						type="select"
						className="custom-select"
						value={customer.data.orderStatus}
						onChange={event =>
							this.updateOrderStatus(
								customer.id,
								event.target.value
							)
						}>
						<option value="Order Recieved">Order Recieved</option>
						<option value="Order Processed">Order Processed</option>
						<option value="In Production">In Production</option>
						<option value="Scheduled for Shipping">
							Scheduled for Shipping
						</option>
						<option value="Out For Delivery">
							Out for Delivery
						</option>
						<option value="Delivered">Delivered</option>
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

		return (
			<Row className="orders-table">
				<Col md={12} className="card">
					<CardHeader
						className="table-header"
						data-background-color="blue">
						<h4 className="title">Recent Orders</h4>
						<p className="category">
							View your 5 most recent orders here
						</p>
					</CardHeader>
					<CardBody className="card-content table-responsive">
						<Table responsive size="sm">
							<thead className="text-primary">
								<tr>
									<th>Order ID</th>
									<th className="wider">First Name</th>
									<th className="wider">Last Name</th>
									<th>Order Status</th>
									<th>Updated</th>
									<th>Created</th>
								</tr>
							</thead>
							<tbody>{recentOrders}</tbody>
						</Table>
					</CardBody>
					<CardFooter className="text-center table-footer">
						<div className="text-primary mt-3 stats">
							<Link to={ROUTES.ORDERS} className="btn btn-outline-primary" >View All</Link>
						</div>
					</CardFooter>
				</Col>
			</Row>
		);
	}
}

export default withAuthentication(RecentOrders);
