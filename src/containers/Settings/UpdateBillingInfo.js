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
import {
	CountryDropdown,
	RegionDropdown,
	CountryRegionData,
} from "react-country-region-selector";

class UpdateBillingInfo extends Component {
	state = {
		country: "",
		state: "",
	};

	selectCountry(val) {
		this.setState({ country: val });
	}

	selectState(val) {
		this.setState({ state: val });
	}

	render() {
		const { country, state } = this.state;

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
											for="city"
											className="field-label">
											City
										</Label>
										<RegionDropdown
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
											for="state"
											className="field-label">
											State/Province/Region
										</Label>
										<Input
											id="state"
											type="text"
											name="state"
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
								color="danger"
								disabled={true}
								type="submit">
								Update billing address
							</Button>
						</Form>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default UpdateBillingInfo;
