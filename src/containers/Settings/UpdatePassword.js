import React, { Component } from "react";
import {
	Card,
	CardBody,
	Col,
	FormGroup,
	Form,
	FormText,
	Label,
	Input,
	Button,
	Alert,
} from "reactstrap";
import Firebase from "firebase/app";

import { withFirebase } from "../../components/Firebase";
import Spinner from "../../components/UI/Spinner/Spinner";

class UpdatePassword extends Component {
	state = {
		currpass: "",
		newpass1: "",
		newpass2: "",

		loading: false,
		hasError: "",
		success: "",
	};

	onSubmitHandler = event => {
		event.preventDefault();

		this.setState({ loading: true });

		const { firebase } = this.props;
		const { currpass, newpass1 } = this.state;
		const currentMerchant = firebase.auth.currentUser;
		const credential = Firebase.auth.EmailAuthProvider.credential(
			currentMerchant.email,
			currpass
		);

		currentMerchant
			.reauthenticateWithCredential(credential)
			.then(() => {
				firebase.doPasswordUpdate(newpass1);
				this.setState({
					success: "Your password has been reset.",
					hasError: "",
					loading: false,
					currpass: "",
					newpass1: "",
					newpass2: "",
				});
			})
			.catch(err => {
				if (err.code === "auth/wrong-password") {
					this.setState({
						hasError:
							"Hmmm, we don't recognize that password. Please try again",
					});
				} else {
					this.setState({ hasError: err.message });
				}
				this.setState({
					currpass: "",
					newpass1: "",
					newpass2: "",
					loading: false,
					success: "",
				});
			});
	};

	captureFieldValue = ({ prop, value }) => this.setState({ [prop]: value });

	render() {
		const {
			currpass,
			newpass1,
			newpass2,
			hasError,
			success,
			loading,
		} = this.state;

		const isInvalid =
			currpass === "" ||
			newpass1.toLocaleLowerCase().length < 8 ||
			newpass2 !== newpass1;

		return (
			<Col lg="3">
				<Card>
					<CardBody>
						<h3>Update your password</h3>
						{!loading ? (
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
								<FormGroup>
									<Label
										for="currpass"
										className="field-label">
										Current password
									</Label>
									<Input
										id="currpass"
										type="password"
										name="currpass"
										className="form-control"
										value={currpass}
										onChange={event =>
											this.captureFieldValue({
												prop: "currpass",
												value: event.target.value,
											})
										}
									/>
								</FormGroup>
								<FormGroup>
									<Label
										for="newpass1"
										className="field-label">
										New password
									</Label>
									<Input
										id="newpass1"
										type="password"
										name="newpass1"
										className="form-control"
										value={newpass1}
										onChange={event =>
											this.captureFieldValue({
												prop: "newpass1",
												value: event.target.value,
											})
										}
									/>
									<FormText>
										Your new password should be at least 8
										characters long
									</FormText>
								</FormGroup>
								<FormGroup>
									<Label
										for="newpass2"
										className="field-label">
										Renter password
									</Label>
									<Input
										id="newpass2"
										type="password"
										name="newpass2"
										className="form-control"
										value={newpass2}
										onChange={event =>
											this.captureFieldValue({
												prop: "newpass2",
												value: event.target.value,
											})
										}
									/>
								</FormGroup>
								<Button
									disabled={isInvalid}
									type="submit"
									outline
									color="danger">
									Update password
								</Button>
							</Form>
						) : (
							<Spinner />
						)}
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default withFirebase(UpdatePassword);
