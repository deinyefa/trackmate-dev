import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => (
  <div>
    <h1>Sign Up Page</h1>
    <SignUpForm />
  </div>
);

class SignUpForm extends Component {
  onSubmit = () => console.log('user has submitted form');

  render() {
    return (
      <div className="formContainer">
        <form onSubmit={this.onSubmit}>
          <input value="" onChange="" type="text" placeholder="CompanyName" />
          <input value="" onChange="" type="text" placeholder="Email" />
          <input value="" onChange="" type="text" placeholder="password" />
          <input value="" onChange="" type="password" placeholder="Confirm Password" />
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

export default SignUpPage;
export { SignUpForm, SignUpLink };
