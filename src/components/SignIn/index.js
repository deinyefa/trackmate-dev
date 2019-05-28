import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardHeader,
	Input,
	InputGroup,
	Button,
	Alert,
} from "reactstrap";
import { Formik } from "formik";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { SignUpLink } from "../SignUp";
import * as routes from "../../constants/routes";
import PasswordForget from "../PasswordForget";

const SignInPage = ({ history }) => (
	<div className="authContainer signIn">
		<SignInForm history={history} />
		<SignUpLink />
		<PasswordForget />
	</div>
);

// function that allows you to dynamically set state keys and values as the user types
const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

const SIGNIN_STATE = {
	email: "",
	password: "",
	error: null,
};

class SignInFormBase extends Component {
	state = {
		...SIGNIN_STATE,
	};

	onSubmit = event => {
		const { email, password } = this.state;
		const { history } = this.props;

		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState(() => ({ ...SIGNIN_STATE }));
				history.push(routes.DASHBOARD);
			})
			.catch(error => {
				this.setState(byPropKey("error", error.message));
			});
		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { email, password, error } = this.state;

		const isInvalid = password === "" || email === "";

		return (
			<div className="formContainer signin-page">
				<div
					className="page-header header-filter"
					data-paralax="true"
					style={{
						backgroundImage: 'url("/images/profile_city.jpg")',
					}}>
					<Container className="page-wrapper">
						<Row>
							<Col md={4} sm={6} className="mx-auto">
								<Card className="card-signin">
									<form onSubmit={this.onSubmit}>
										{error ? (
											<Alert color="danger">
												{error}
											</Alert>
										) : (
											""
										)}
										<CardHeader className="card-header-rose text-center">
											<h4 className="title">Log in</h4>
										</CardHeader>
										<CardBody>
											<Row>
												<Col>
													<InputGroup>
														<Input
															value={email}
															onChange={event =>
																this.setState(
																	byPropKey(
																		"email",
																		event
																			.target
																			.value
																	)
																)
															}
															type="email"
															placeholder="Email Address"
															className="form-control"
														/>
													</InputGroup>
												</Col>
											</Row>
											<Row>
												<Col>
													<InputGroup>
														<Input
															value={password}
															onChange={event =>
																this.setState(
																	byPropKey(
																		"password",
																		event
																			.target
																			.value
																	)
																)
															}
															type="password"
															placeholder="Password"
														/>
													</InputGroup>
												</Col>
											</Row>
											<Button
												type="submit"
												disabled={isInvalid}
												color="rose"
												block>
												GO!
											</Button>
										</CardBody>
									</form>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase
)(SignInFormBase);

export default SignInPage;
export { SignInForm, SignUpLink };
