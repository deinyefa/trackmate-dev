import React, { Component } from "react";
import {
	Row,
	Card,
	CardBody,
	Col,
	FormGroup,
	Form,
	Label,
	Input,
	Button,
	Alert,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";

import { withFirebase } from "../../components/Firebase";
import Spinner from "../../components/UI/Spinner/Spinner";

class UpdateProfile extends Component {
	state = {
		currentMerchant: "",

		company: "",
		username: "",
		email: "",
		oldEmail: "",
		fname: "",
		lname: "",

		hasError: "",
		success: "",
		loading: false,

		showModal: false,
	};

	captureFieldValue = ({ prop, value }) => this.setState({ [prop]: value });

	componentDidMount = () => {
		const { firebase } = this.props;
		const currentMerchant = firebase.auth.currentUser.uid;
		this.setState({ currentMerchant });
		const merchantRef = firebase.db
			.collection("companies")
			.doc(currentMerchant);
		merchantRef.get().then(doc =>
			this.setState({
				company: doc.data().companyName,
				email: doc.data().email,
				oldEmail: doc.data().email,
			})
		);
	};

	onSubmitHandler = event => {
		event.preventDefault();

		const { email, oldEmail } = this.state;

		if (email !== oldEmail) {
			this.setState({ showModal: true });
		} else {
			this.pushDataOnline();
		}
	};

	pushDataOnline = () => {
		const { username, email, fname, lname, currentMerchant } = this.state;
		const { firebase } = this.props;
		const merchantRef = firebase.db
			.collection("companies")
			.doc(currentMerchant);

		this.setState({ loading: true });

		firebase.auth.currentUser
			.updateEmail(email)
			.then(() => {
				merchantRef
					.set(
						{
							email,
							firstName: fname,
							lastName: lname,
							username,
						},
						{ merge: true }
					)
					.then(() =>
						this.setState({
							success:
								"You have successfully updated your profile!",
							showModal: false,
							loading: false,
							username: "",
							fname: "",
							lname: "",
						})
					)
					.catch(err =>
						this.setState({
							hasError: err.message,
							showModal: false,
							loading: false,
						})
					);
			})
			.catch(err =>
				this.setState({
					hasError: err.message,
					showModal: false,
					loading: false,
				})
			);
	};

	toggleModalHandler = () => {
		this.setState(prevState => ({ showModal: !prevState.showModal }));
	};

	render() {
		const {
			company,
			username,
			email,
			fname,
			lname,
			showModal,
			hasError,
			success,
			loading,
		} = this.state;

		const isInvalid =
			username === "" || email === "" || fname === "" || lname === "";

		return (
			<Col lg="9">
				<Card>
					<CardBody>
						<h3>Edit your company profile</h3>
						{loading ? (
							<Spinner />
						) : (
							<Form
								onSubmit={event => this.onSubmitHandler(event)}>
								{hasError ? (
									<Alert
										color="danger"
										className="mx-auto my-3">
										{hasError}
									</Alert>
								) : null}
								{success ? (
									<Alert
										color="success"
										className="mx-auto my-3">
										{success}
									</Alert>
								) : null}
								<Row>
									<Col>
										<FormGroup>
											<Label
												for="company"
												className="field-label">
												Company
											</Label>
											<Input
												id="company"
												type="text"
												name="company"
												className="form-control"
												disabled
												defaultValue={company}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label
												for="username"
												className="field-label">
												Username
											</Label>
											<Input
												id="username"
												type="text"
												name="username"
												className="form-control"
												value={username}
												onChange={event =>
													this.captureFieldValue({
														prop: "username",
														value:
															event.target.value,
													})
												}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label
												for="email"
												className="field-label">
												Email address
											</Label>
											<Input
												id="email"
												type="email"
												name="email"
												className="form-control"
												value={email}
												onChange={event =>
													this.captureFieldValue({
														prop: "email",
														value:
															event.target.value,
													})
												}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Label
												for="fname"
												className="field-label">
												First name
											</Label>
											<Input
												id="fname"
												type="text"
												name="fname"
												className="form-control"
												value={fname}
												onChange={event =>
													this.captureFieldValue({
														prop: "fname",
														value:
															event.target.value,
													})
												}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label
												for="lname"
												className="field-label">
												Last name
											</Label>
											<Input
												id="lname"
												type="text"
												name="lname"
												className="form-control"
												value={lname}
												onChange={event =>
													this.captureFieldValue({
														prop: "lname",
														value:
															event.target.value,
													})
												}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Button
									outline
									color="success"
									disabled={isInvalid}
									type="submit">
									Update profile
								</Button>
							</Form>
						)}
					</CardBody>
				</Card>
				<Modal
					isOpen={showModal}
					onClick={this.toggleModalHandler}
					centered>
					<ModalHeader toggle={() => this.toggleModalHandler}>
						Caution!
					</ModalHeader>
					<ModalBody>
						You are about to update your primary email! You will
						need your new email the next time you log in
					</ModalBody>
					<ModalFooter>
						<Button color="primary">Cancel</Button>
						<Button color="danger" onClick={this.pushDataOnline}>
							Update profile
						</Button>
					</ModalFooter>
				</Modal>
			</Col>
		);
	}
}

export default withFirebase(UpdateProfile);
