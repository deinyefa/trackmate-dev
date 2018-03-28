import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';
import { signupValues } from '../actions';
import { auth } from '../firebase';

const SignUpPage = ({ history }) => (
  <div>
    <h1>Sign Up Page</h1>
    <SignUpForm history={history} />
  </div>
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
    event.preventDefault();
  };

  render() {
    const {
      email,
      companyName,
      passwordOne,
      passwordTwo,
      signupValues,
      error
    } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      companyName === '';

    return (
      <div className="formContainer">
        <form onSubmit={this.onSubmit}>
          <input
            value={companyName}
            onChange={event =>
              signupValues({ prop: 'companyName', value: event.target.value })
            }
            type="text"
            placeholder="CompanyName"
          />
          <input
            value={email}
            onChange={event =>
              signupValues({ prop: 'email', value: event.target.value })
            }
            type="text"
            placeholder="Email"
          />
          <input
            value={passwordOne}
            onChange={event =>
              signupValues({ prop: 'passwordOne', value: event.target.value })
            }
            type="password"
            placeholder="password"
          />
          <input
            value={passwordTwo}
            onChange={event =>
              signupValues({ prop: 'passwordTwo', value: event.target.value })
            }
            type="password"
            placeholder="Confirm Password"
          />
          <button type="submit" disabled={isInvalid}>
            Sign Up
          </button>
          {<p>{this.state.error}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () => {
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>;
};

const mapStateToProps = state => {
  const { email, companyName, passwordOne, passwordTwo, error } = state.auth;
  return {
    email,
    companyName,
    passwordOne,
    passwordTwo,
    error
  };
};

export default withRouter(SignUpPage);
export const SignUpForm = connect(mapStateToProps, { signupValues })(
  NewSignUpForm
);
export { SignUpLink };
