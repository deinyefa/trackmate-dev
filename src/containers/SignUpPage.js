import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';
import { signupValues } from '../actions';

const SignUpPage = () => (
  <div>
    <h1>Sign Up Page</h1>
    <SignUpForm />
  </div>
);

class NewSignUpForm extends Component {
  onSubmit = () => console.log('user has submitted form');

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
          {/* {error && <p>{error.message}</p>} */}
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
  const { email, companyName, passwordOne, passwordTwo } = state.auth;
  return {
    email,
    companyName,
    passwordOne,
    passwordTwo
  };
};

export default SignUpPage;
export const SignUpForm = connect(mapStateToProps, {signupValues})(NewSignUpForm)
export { SignUpLink };
