import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  Alert
} from 'reactstrap';

import * as routes from '../constants/routes';
import { signupValues } from '../actions';
import { auth, db } from '../firebase';

const SignUpPage = ({ history }) => (
  <Container className="authContainer">
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </Container>
);

const SIGNUP_STATE = { error: null };

class NewSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...SIGNUP_STATE };
  }
  onSubmit = event => {
    const { email, passwordOne, companyName, history } = this.props;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => history.push(routes.DASHBOARD))
      .catch(error => this.setState({ ...this.state, error: error.message }));
    console.log(this.state);
    // add company name to new company here
    // firebase.db
    event.preventDefault();
  };

  render() {
    const {
      email,
      companyName,
      passwordOne,
      passwordTwo,
      signupValues
    } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      companyName === '';

    return (
      <div className="formContainer">
        <form onSubmit={this.onSubmit}>
          {this.state.error ? (
            <Alert color="danger">{this.state.error}</Alert>
          ) : (
            ''
          )}
          <Row>
            <Col>
              <InputGroup>
                <Input
                  value={companyName}
                  onChange={event =>
                    signupValues({
                      prop: 'companyName',
                      value: event.target.value
                    })
                  }
                  type="text"
                  placeholder="Company Name"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <Input
                  value={email}
                  onChange={event =>
                    signupValues({ prop: 'email', value: event.target.value })
                  }
                  type="text"
                  placeholder="Email"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <Input
                  value={passwordOne}
                  onChange={event =>
                    signupValues({
                      prop: 'passwordOne',
                      value: event.target.value
                    })
                  }
                  type="password"
                  placeholder="password"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <Input
                  value={passwordTwo}
                  onChange={event =>
                    signupValues({
                      prop: 'passwordTwo',
                      value: event.target.value
                    })
                  }
                  type="password"
                  placeholder="Confirm Password"
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
        <SignInLink />
      </div>
    );
  }
}

Container.propTypes = {
  fluid: PropTypes.bool
  // applies .container-fluid class
};

const SignInLink = () => (
  <p className="signInLink">
    Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link>
  </p>
);

const mapStateToProps = state => {
  const { email, companyName, passwordOne, passwordTwo } = state.auth;
  return {
    email,
    companyName,
    passwordOne,
    passwordTwo
  };
};

export default withRouter(SignUpPage);
export const SignUpForm = connect(mapStateToProps, { signupValues })(
  NewSignUpForm
);
export { SignInLink };
