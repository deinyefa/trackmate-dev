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
		country: "",
		state: "",
		togglePaymentForm: false,

		cardName: "",
		cardNumber: "",
		cardExpiry: "",
		cvc: "",
	};

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

	render() {
		const {
			country,
			state,
			togglePaymentForm,
			cardName,
			cardNumber,
			cardExpiry,
			cvc,
		} = this.state;

		return (
			<Col>
				<h2>Update your billing info</h2>
				<Card>
					<CardBody>
						<h3>Billing address</h3>
						<Form>
							<FormGroup>
								<Label for="fullname" className="field-label">
									Full name
								</Label>
								<Input
									id="fullname"
									type="text"
									name="fullname"
									className="form-control"
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
										/>
									</FormGroup>
								</Col>
							</Row>
							<Button
								outline
								color="success"
								// disabled={true}
								type="submit">
								Update billing address
							</Button>
							<Button
								color="warning"
								type="button"
								onClick={this.togglePaymentFormHandler}
								style={{ marginLeft: "15px " }}>
								Update payment method
							</Button>
						</Form>

						{/* Update Credit Card */}

						{togglePaymentForm ? (
							<Row className="mt-5">
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
									<Form>
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
