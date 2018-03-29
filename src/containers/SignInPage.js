import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  Alert
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
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...SIGNIN_STATE };
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
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;
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
                  type="text"
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
