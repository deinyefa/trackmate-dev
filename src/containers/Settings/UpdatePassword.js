import React, { Component } from "react";
import {
	Card,
	CardBody,
	Col,
	FormGroup,
	Form,
	// FormFeedback,
	Label,
	Input,
	Button,
	// Alert,
} from "reactstrap";

class UpdatePassword extends Component {
	render() {
		return (
			<Col lg="3">
				<Card>
					<CardBody>
						<h3>Update your password</h3>
						<Form>
							<FormGroup>
								<Label for="currpass" className="field-label">
									Current password
								</Label>
								<Input
									id="currpass"
									type="password"
									name="currpass"
									className="form-control"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="newpass1" className="field-label">
									New password
								</Label>
								<Input
									id="newpass1"
									type="password"
									name="newpass1"
									className="form-control"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="newpass2" className="field-label">
									Renter password
								</Label>
								<Input
									id="newpass2"
									type="password"
									name="newpass2"
									className="form-control"
								/>
							</FormGroup>
							<Button
								disabled
								type="submit"
								outline
								color="danger">
								Update password
							</Button>
						</Form>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default UpdatePassword;
