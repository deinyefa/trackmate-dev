import React, { Component } from "react";
import {
	Container,
	Row,
	Table,
	Col,
	Card,
	CardHeader,
	CardBody,
} from "reactstrap";
import moment from "moment";

import TableStyles from "../../../Styles/Table.module.css";
import { withAuthentication } from "../../../components/Session";
import Spinner from "../../../components/UI/Spinner/Spinner";

class OrdersList extends Component {
	state = {
		currentMerchant: null,
		merchantCustomers: [],
	};

	componentDidMount = () => {
		const { firebase } = this.props;

		let currentMerchant = firebase.auth.currentUser.uid;
		this.setState({ currentMerchant });

		let updatedMerchantCustomers = [...this.state.merchantCustomers];

		let customersRef = firebase.db
			.collection("companies")
			.doc(currentMerchant)
			.collection("customers");

		customersRef
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					updatedMerchantCustomers.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				this.setState({
					merchantCustomers: updatedMerchantCustomers,
					totalOrders: this.state.merchantCustomers.length,
				});
			})
			.catch(err => console.log(err));
	};

	updateOrderStatus = (id, value) => {
		const { firebase } = this.props;
		const { currentMerchant } = this.state;

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

	sortOrder = label => {
		const { merchantCustomers } = this.state;
		let updatedMerchantCustomers = [...merchantCustomers];

		switch (label) {
			case "Order ID":
				updatedMerchantCustomers.sort(obj => obj.data.orderID);
				break;
			case "First Name":
				updatedMerchantCustomers.sort(obj => obj.data.firstName);
				break;
			case "Last Name":
				updatedMerchantCustomers.sort(obj => obj.data.lastName);
				break;
			case "Created":
				updatedMerchantCustomers.sort(obj => obj.data.createdAt);
				break;
			case "Updated On":
				updatedMerchantCustomers.sort(obj => obj.data.updatedAt);
				break;
			default:
				break;
		}
		this.setState({ merchantCustomers: updatedMerchantCustomers });
		console.log(this.state.merchantCustomers);
	};

	render() {
		return (
			<Container className="table-container">
				<Row>
					<Col md={12}>
						<Card>
							<CardHeader data-background-color="blue">
								<h2 className="title">Orders</h2>
								<p className="category">
									Your customers get notified when their order
									is updated
								</p>
							</CardHeader>
							<CardBody className="card-content table-responsive">
								<Table
									responsive
									size="sm"
									className={TableStyles.Table}>
									<thead
										className={`text-primary ${
											TableStyles.Thead
										}`}>
										<tr>
											<th
												onClick={event =>
													this.sortOrder(
														event.target.innerHTML
													)
												}>
												Order ID
											</th>
											<th
												className="wider"
												onClick={event =>
													this.sortOrder(
														event.target.innerHTML
													)
												}>
												First Name
											</th>
											<th
												className="wider"
												onClick={event =>
													this.sortOrder(
														event.target.innerHTML
													)
												}>
												Last Name
											</th>
											<th>Order Status</th>
											<th>Updated</th>
											<th
												onClick={event =>
													this.sortOrder(
														event.target.innerHTML
													)
												}>
												Created
											</th>
										</tr>
									</thead>
									<tbody className={TableStyles.Tbody}>
										{this.state.merchantCustomers.length <=
										0 ? (
											<tr>
												<td colSpan="6">
													<Spinner />
												</td>
											</tr>
										) : (
											this.state.merchantCustomers.map(
												customer => (
													<tr key={customer.id}>
														<td>{customer.id}</td>
														<td>
															{
																customer.data
																	.firstName
															}
														</td>
														<td>
															{
																customer.data
																	.lastName
															}
														</td>
														<td>
															<select
																type="select"
																className={
																	TableStyles.CustomSelect
																}
																value={
																	customer
																		.data
																		.orderStatus
																}
																onChange={event =>
																	this.updateOrderStatus(
																		customer.id,
																		event
																			.target
																			.value
																	)
																}>
																<option value="">
																	-- Select --
																</option>
																<option value="recieved">
																	Order
																	Recieved
																</option>
																<option value="processed">
																	Order
																	Processed
																</option>
																<option value="production">
																	Production
																</option>
																<option value="shipping">
																	Scheduled
																	for Shipping
																</option>
																<option value="outForDelivery">
																	Out for
																	Delivery
																</option>
																<option value="delivered">
																	Delivered
																</option>
															</select>
														</td>
														<td>
															{moment(
																customer.data.updatedOn.toDate()
															).format(
																"MMM D YYYY, HH:mm:ss"
															)}
														</td>
														<td>
															{moment(
																customer.data.createdAt.toDate()
															).format(
																"MMM D YYYY, HH:mm:ss"
															)}
														</td>
													</tr>
												)
											)
										)}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default withAuthentication(OrdersList);
