import React, { Component, Fragment } from "react";
import {
	Container,
	Row,
	Col,
	FormGroup,
	Form,
	FormFeedback,
	Label,
	Input,
	FormText,
	Button,
	Alert,
} from "reactstrap";

import { withAuthentication } from "../../../components/Session";

class AddOrderPage extends Component {
	state = {
		orderID: "",
		firstName: "",
		lastName: "",
		orderStatus: "",
		orderError: "",
		orderAdded: "",
		trackmateURL: "",
	};

	addAnOrder = (orderID, lastName, firstName, orderStatus) => {
		const { firebase } = this.props;
		const currentMerchant = firebase.auth.currentUser.uid;
		let customerData = {
			orderID,
			lastName,
			firstName,
			orderStatus,
			updatedOn: new Date(),
			createdAt: new Date(),
		};
		let customerRef = firebase.db
			.collection("companies")
			.doc(currentMerchant)
			.collection("customers")
			.doc(orderID);

		customerRef
			.get()
			.then(doc => {
				if (doc.exists) {
					this.setState({
						orderError:
							"Oh no! It looks like there's already an order with that ID",
					});
				} else {
					customerRef.set(customerData);
					this.setState({
						orderAdded:
							"Order has been successfully added, find your customs's trackmate notification URL below.",
						trackmateURL: `https://trackmate.com/${lastName.toLowerCase()}/${orderID}`,
					});
				}
			})
			.catch(err => console.log(err));
	};

	inputAnOrder = ({ prop, value }) => this.setState({ [prop]: value });

	onSubmit = event => {
		event.preventDefault();

		const { orderID, firstName, lastName, orderStatus } = this.state;
		this.addAnOrder(orderID, lastName, firstName, orderStatus);
	};

	render() {
		const {
			orderID,
			lastName,
			firstName,
			orderStatus,
			orderError,
			orderAdded,
			trackmateURL,
		} = this.state;

		const isInvalid =
			orderID === "" ||
			orderID.length < 8 ||
			lastName === "" ||
			firstName === "" ||
			orderStatus === "";

		return (
			<div className="card">
				<Row className="card-header" data-background-color="green">
					<h1>Add An Order</h1>
				</Row>
				<Row className="card-body">
					{orderError ? (
						<Alert color="danger" style={{ margin: "auto" }}>
							{orderError}
						</Alert>
					) : null}
					{orderAdded ? (
						<Alert color="success" style={{ margin: "auto" }}>
							{orderAdded}
						</Alert>
					) : null}
					<Form onSubmit={this.onSubmit} className="m-auto py-4">
						<FormGroup>
							<Label for="orderID" className="field-label">
								Order ID
							</Label>
							<Input
								id="orderID"
								type="text"
								name="orderID"
								placeholder="ex. A70T4Y88"
								className={
									orderError
										? "form-control is-invalid"
										: "form-control"
								}
								onChange={event => {
									this.setState({ orderError: "" });
									this.inputAnOrder({
										prop: "orderID",
										value: event.target.value.trim(),
									});
								}}
								value={orderID}
							/>
							{orderError ? (
								<FormFeedback>
									{" "}
									Whoops! That Order ID is already in use.
								</FormFeedback>
							) : null}
							<FormText>
								A unique alphanumeric value given to each
								customer. At least 8 characters long.
							</FormText>
						</FormGroup>
						<Row>
							<Col>
								<FormGroup>
									<Label
										for="firstName"
										className="field-label">
										First Name
									</Label>
									<Input
										id="firstName"
										type="text"
										name="firstName"
										placeholder="Lucy"
										className="form-control"
										onChange={event =>
											this.inputAnOrder({
												prop: "firstName",
												value: event.target.value,
											})
										}
										value={firstName}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label
										for="lastName"
										className="field-label">
										Last Name
									</Label>
									<Input
										id="lastName"
										type="text"
										name="lastName"
										placeholder="Sandwich"
										className="form-control"
										onChange={event =>
											this.inputAnOrder({
												prop: "lastName",
												value: event.target.value,
											})
										}
										value={lastName}
									/>
								</FormGroup>
							</Col>
						</Row>
						<FormGroup>
							<Label for="orderStatus" className="field-label">
								Production Status
							</Label>
							<Input
								type="select"
								name="orderStatus"
								id="orderStatus"
								className="form-control"
								onChange={event =>
									this.inputAnOrder({
										prop: "orderStatus",
										value: event.target.value,
									})
								}
								value={orderStatus}>
								<option value="">-- Select --</option>
								<option value="recieved">Order Recieved</option>
								<option value="processed">
									Order Processed
								</option>
								<option value="production">Production</option>
								<option value="shipping">
									Scheduled for Shipping
								</option>
								<option value="outForDelivery">
									Out for Delivery
								</option>
								<option value="delivered">Delivered</option>
							</Input>
						</FormGroup>
						<Button
							outline
							color="primary"
							disabled={isInvalid}
							type="submit">
							Create
						</Button>
					</Form>
				</Row>
				<Row>
					{orderAdded ? (
						<Col
							style={{
								borderTop: "1px solid",
								margin: "1em 2em",
								padding: "1em",
								borderColor: "#43a047",
							}}>
							<p>Trackmate Notification URL</p>
							<a
								href="https://google.com"
								target="_blank"
								rel="noopener noreferrer">
								{trackmateURL}
							</a>
						</Col>
					) : null}
				</Row>
			</div>
		);
	}
}

export default withAuthentication(AddOrderPage);
