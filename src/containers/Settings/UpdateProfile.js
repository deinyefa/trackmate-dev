import React, {  } from "react";
import {
	Row,
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

const UpdateProfile = () => (
	<Col lg="9">
		<Card>
			<CardBody>
				<h3>Edit your company profile</h3>
				<Form>
					<Row>
						<Col>
							<FormGroup>
								<Label for="company" className="field-label">
									Company
								</Label>
								<Input
									id="company"
									type="text"
									name="company"
									className="form-control"
									disabled
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="username" className="field-label">
									Username
								</Label>
								<Input
									id="username"
									type="text"
									name="username"
									placeholder="lucy-40"
									className="form-control"
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="email" className="field-label">
									Email address
								</Label>
								<Input
									id="email"
									type="email"
									name="email"
									className="form-control"
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormGroup>
								<Label for="fname" className="field-label">
									First name
								</Label>
								<Input
									id="fname"
									type="text"
									name="fname"
									className="form-control"
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="lname" className="field-label">
									Last name
								</Label>
								<Input
									id="lname"
									type="text"
									name="lname"
									className="form-control"
								/>
							</FormGroup>
						</Col>
					</Row>
					<Button
						outline
						color="primary"
						disabled={true}
						type="submit">
						Update profile
					</Button>
				</Form>
			</CardBody>
		</Card>
	</Col>
);

export default UpdateProfile;
