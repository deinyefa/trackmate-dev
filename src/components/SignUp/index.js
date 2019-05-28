import React, { Component } from "react";
import { Formik } from "formik";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import {
	Container,
	Row,
	Col,
	Input,
	FormGroup,
	Button,
	// Alert,
	Label,
} from "reactstrap";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
	<Container fluid>
		<h1>Sign Up</h1>
		<SignUpForm />
	</Container>
);

const INITIAL_STATE = {
	email: "",
	companyName: "",
	passwordOne: "",
	passwordTwo: "",
	signupValues: "",
};

class SignUpFormBase extends Component {
	state = {
		...INITIAL_STATE,
		error: null,
	};

	onSubmit = event => {
		const { companyName, email, passwordOne } = this.state;

		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.DASHBOARD);
			})
			.catch(error => {
				this.setState({ ...this.state, error });
			});
		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const {
			email,
			companyName,
			passwordOne,
			passwordTwo,
			error,
		} = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			companyName === "";

		return (
			<Formik
				initialValues={INITIAL_STATE}
				onSubmit={(values, actions) => this.onSubmit}
				render={props => (
					<form onSubmit={props.handleSubmit}>
						<Row>
							<Col>
								<FormGroup>
									<Label for="company">Company Name</Label>
									<Input
										id="company"
										name="companyName"
										value={companyName}
										onChange={this.onChange}
										type="text"
										placeholder="An Awesome Small Business"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="email">Email</Label>
									<Input
										id="email"
										name="email"
										value={email}
										onChange={this.onChange}
										type="email"
										placeholder="orders@aasb.com"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="passwordOne">Password</Label>
									<Input
										id="passwordOne"
										name="passwordOne"
										value={passwordOne}
										onChange={this.onChange}
										type="password"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="passwordTwo">
										Confirm Password
									</Label>
									<Input
										id="passwordTwo"
										name="passwordTwo"
										value={passwordTwo}
										onChange={this.onChange}
										type="password"
									/>
								</FormGroup>
							</Col>
						</Row>
						{error && <p>{error.message}</p>}
						<Button type="submit" disabled={isInvalid}>
							Register
						</Button>
					</form>
				)}
			/>
		);
	}
}

const SignUpLink = () => (
	<p>
		Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
	</p>
);

const SignUpForm = compose(
	withRouter,
	withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
