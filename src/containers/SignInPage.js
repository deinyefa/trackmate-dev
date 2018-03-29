import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) => (
  <Container className="authContainer signIn">
    <h1>Sign In</h1>
    <SignInForm history={history} />
  </Container>
);

// function that allows you to dynamically set state keys and values as the user types
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const SIGNIN_STATE = {
  email: '',
  password: '',
  error: null,
  modal: false
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...SIGNIN_STATE };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      email: '',
      pwdResetError: '',
      pwdResetSuccess: ''
    });
  }

  onSubmit = event => {
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...SIGNIN_STATE }));
        history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState(byPropKey('error', error.message));
      });
    event.preventDefault();
  };

  onSubmitForgotPassword = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({
          pwdResetSuccess: 'An email has successfully been sent to you'
        }));
      })
      .catch(error => {
        this.setState(byPropKey('pwdResetError', error.message));
      });
    event.preventDefault();
  };

  render() {
    const {
      email,
      password,
      error,
      pwdResetError,
      pwdResetSuccess
    } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div className="formContainer">
        <form onSubmit={this.onSubmit}>
          {error ? <Alert color="danger">{error}</Alert> : ''}
          <Row>
            <Col>
              <InputGroup>
                <Input
                  value={email}
                  onChange={event =>
                    this.setState(byPropKey('email', event.target.value))
                  }
                  type="email"
                  placeholder="Email Address"
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
                    this.setState(byPropKey('password', event.target.value))
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
            outline
            color="primary"
            block
          >
            GO!
          </Button>
        </form>
        <SignUpLink />
        <div>
          <p className="signInLink">
            Forgot Password?{' '}
            <Button color="danger" onClick={this.toggle}>
              Click Here
            </Button>
          </p>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Forgot Password</ModalHeader>
            <ModalBody>
              {pwdResetError ? (
                <Alert color="danger">{pwdResetError}</Alert>
              ) : (
                ''
              )}
              {pwdResetSuccess ? (
                <Alert color="success">{pwdResetSuccess}</Alert>
              ) : (
                ''
              )}
              Enter your an email address we can reach you at to reset your
              password.
              <Input
                type="email"
                value={email}
                onChange={event =>
                  this.setState(byPropKey('email', event.target.value))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSubmitForgotPassword}>
                Reset Password
              </Button>{' '}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p className="signInLink">
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignInPage);
export { SignInForm, SignUpLink };
