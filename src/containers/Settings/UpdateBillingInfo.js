import React, { Component } from "react";
import {
	Card,
	CardBody,
	Col,
	Row,
	FormGroup,
	Form,
	// FormFeedback,
	FormText,
	Label,
	Input,
	Button,
	// Alert,
} from "reactstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

class UpdateBillingInfo extends Component {
	state = {
		fullname: "",
		address1: "",
		address2: "",
		country: "",
		state: "",
		city: "",
		postalCode: "",

		togglePaymentForm: false,

		cardName: "",
		cardNumber: "",
		cardExpiry: "",
		cvc: "",
	};

	captureFieldValue = ({ prop, value }) => this.setState({ [prop]: value });

	selectCountry(val) {
		this.setState({ country: val });
	}

	selectState(val) {
		this.setState({ state: val });
	}

	togglePaymentFormHandler = () => {
		this.setState(prevState => ({
			togglePaymentForm: !prevState.togglePaymentForm,
		}));
	};

	captureFieldValue = ({ prop, value }) => this.setState({ [prop]: value });

	onSubmitBillingAddressHandler = event => {
		event.preventDefault();
		console.log(this.state);
	};

	onSubmitUpdateCardHandler = event => {
		event.preventDefault();
		console.log(this.state);
	};

	render() {
		const {
			fullname,
			address1,
			address2,
			city,
			postalCode,
			country,
			state,

			togglePaymentForm,

			cardName,
			cardNumber,
			cardExpiry,
			cvc,
		} = this.state;

		const invaidAddress =
			fullname.trim() === "" ||
			address1.trim() === "" ||
			city.trim() === "" ||
			postalCode.trim() === "" ||
			country === "" ||
			state === "";

		const invalidCard =
			cardName.trim() === "" ||
			cardNumber.trim() === "" ||
			cardExpiry.trim() === "" ||
			cvc.trim() === "";

		return (
			<Col>
				<h2>Update your billing info</h2>
				<Card>
					<CardBody>
						<h3>Billing address</h3>
						<Form
							onSubmit={event =>
								this.onSubmitBillingAddressHandler(event)
							}>
							<FormGroup>
								<Label for="fullname" className="field-label">
									Full name
								</Label>
								<Input
									id="fullname"
									type="text"
									name="fullname"
									className="form-control"
									value={fullname}
									onChange={event =>
										this.captureFieldValue({
											prop: "fullname",
											value: event.target.value,
										})
									}
								/>
							</FormGroup>
							<Row>
								<Col>
									<FormGroup>
										<Label
											for="address1"
											className="field-label">
											Address line 1
										</Label>
										<Input
											id="address1"
											type="text"
											name="address1"
											className="form-control"
											value={address1}
											onChange={event =>
												this.captureFieldValue({
													prop: "address1",
													value: event.target.value,
												})
											}
										/>
										<FormText>
											Street address, P.O. box, company
											name, c/o
										</FormText>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label
											for="address2"
											className="field-label">
											Address line 2
										</Label>
										<Input
											id="address2"
											type="text"
											name="address2"
											className="form-control"
											value={address2}
											onChange={event =>
												this.captureFieldValue({
													prop: "address2",
													value: event.target.value,
												})
											}
										/>
										<FormText>
											Apartment, suite, unit, building,
											floor, etc
										</FormText>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormGroup>
										<Label
											for="country"
											className="field-label">
											Country
										</Label>
										<CountryDropdown
											id="country"
											value={country}
											className="form-control"
											priorityOptions={["NG", "CA", "US"]}
											onChange={val =>
												this.selectCountry(val)
											}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormGroup>
										<Label
											for="state"
											className="field-label">
											State/Province/Region
										</Label>
										<RegionDropdown
											id="state"
											country={country}
											blankOptionLabel="No country selected"
											defaultOptionLabel="Select a region"
											className="form-control"
											value={state}
											onChange={val =>
												this.selectState(val)
											}
										/>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label
											for="city"
											className="field-label">
											City
										</Label>
										<Input
											id="city"
											type="text"
											name="city"
											className="form-control"
											value={city}
											onChange={event =>
												this.captureFieldValue({
													prop: "city",
													value: event.target.value,
												})
											}
										/>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label
											for="postalCode"
											className="field-label">
											ZIP/Postal code
										</Label>
										<Input
											id="postalCode"
											type="text"
											name="postalCode"
											className="form-control"
											value={postalCode}
											onChange={event =>
												this.captureFieldValue({
													prop: "postalCode",
													value: event.target.value,
												})
											}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Button
								outline
								color="success"
								disabled={invaidAddress}
								type="submit">
								Update billing address
							</Button>
							<Button
								color="warning"
								type="button"
								onClick={this.togglePaymentFormHandler}
								style={{ marginLeft: "15px" }}>
								Update payment method
							</Button>
						</Form>

						{/* Update Credit Card */}

						{togglePaymentForm ? (
							<Row className="mt-5 w-75 mx-auto">
								<Col style={{ alignSelf: "center" }}>
									<Cards
										number={cardNumber}
										name={cardName}
										expiry={cardExpiry}
										cvc={cvc}
										// focused={state.focused}
									/>
								</Col>
								<Col>
									<Form
										onSubmit={event =>
											this.onSubmitUpdateCardHandler(
												event
											)
										}>
										<FormGroup>
											<Label for="cardNumber">
												Card number
											</Label>
											<Input
												id="cardNumber"
												type="number"
												value={cardNumber}
												onChange={event =>
													this.captureFieldValue({
														prop: "cardNumber",
														value:
															event.target.value,
													})
												}
											/>
										</FormGroup>
										<FormGroup>
											<Label for="cardName">
												Name on card
											</Label>
											<Input
												id="cardName"
												type="text"
												value={cardName}
												onChange={event =>
													this.captureFieldValue({
														prop: "cardName",
														value:
															event.target.value,
													})
												}
											/>
										</FormGroup>
										<Row>
											<Col sm="9">
												<FormGroup>
													<Label for="cardExpiry">
														Expiry
													</Label>
													<Input
														id="cardExpiry"
														value={cardExpiry}
														onChange={event =>
															this.captureFieldValue(
																{
																	prop:
																		"cardExpiry",
																	value:
																		event
																			.target
																			.value,
																}
															)
														}
													/>
												</FormGroup>
											</Col>
											<Col sm="3">
												<FormGroup>
													<Label for="cvc">CVC</Label>
													<Input
														id="cvc"
														value={cvc}
														type="number"
														onChange={event =>
															this.captureFieldValue(
																{
																	prop: "cvc",
																	value:
																		event
																			.target
																			.value,
																}
															)
														}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Button
											type="submit"
											outline
											disabled={invalidCard}
											color="success">
											Update payment method
										</Button>
									</Form>
								</Col>
							</Row>
						) : null}
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default UpdateBillingInfo;
