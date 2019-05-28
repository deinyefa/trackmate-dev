import React from 'react';
import { Button } from 'reactstrap'

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut} className="btn btn-rose">
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);