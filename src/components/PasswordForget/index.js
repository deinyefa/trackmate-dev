import React, { Component, Fragment } from "react";
import {
	Button,
	Alert,
	Modal,
	ModalHeader,
	ModalFooter,
  ModalBody,
	Input,
} from "reactstrap";

// function that allows you to dynamically set state keys and values as the user types
const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

class PasswordForget extends Component {
	state = {
		modal: false,
		email: "",
		pwdResetError: "",
		pwdResetSuccess: "",
  };
  
	toggle = () => {
		this.setState({
			modal: !this.state.modal,
			email: "",
			pwdResetError: "",
			pwdResetSuccess: "",
		});
  }
  
	onSubmitForgotPassword = event => {
		const { email } = this.state;

		this.props.firebase
			.doPasswordReset(email)
			.then(() => {
				this.setState(() => ({
					pwdResetSuccess:
						"An email has successfully been sent to you.",
				}));
			})
			.catch(error => {
				this.setState(byPropKey("pwdResetError", error.message));
			});
		event.preventDefault();
	};

	render() {
		const { modal, email, pwdResetError, pwdResetSuccess } = this.state;

		return (
			<Fragment>
				<p className="signInLink">
					Forgot Password?{" "}
					<Button color="rose" onClick={this.toggle}>
						Click Here
					</Button>
				</p>
				<Modal
					isOpen={modal}
					toggle={this.toggle}
					className={this.props.className}>
					<ModalHeader toggle={this.toggle}>
						Forgot Password
					</ModalHeader>
					<ModalBody>
						{pwdResetError ? (
							<Alert color="danger">{pwdResetError}</Alert>
						) : (
							""
						)}
						{pwdResetSuccess ? (
							<Alert color="success">{pwdResetSuccess}</Alert>
						) : (
							""
						)}
						Enter your an email address we can reach you at to reset
						your password.
						<Input
							type="email"
							value={email}
							onChange={event =>
								this.setState(
									byPropKey("email", event.target.value)
								)
							}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							onClick={this.onSubmitForgotPassword}>
							Reset Password
						</Button>{" "}
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</Fragment>
		);
	}
}

export default PasswordForget;
