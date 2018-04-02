import React from 'react';
import { Button } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

import { auth } from '../firebase';

const SignOut = () => (
  <div className="signout">
    <i className="fa fa-user-circle" />
    <Button type="button" onClick={auth.doSignOut}>
      Sign Out
    </Button>
  </div>
);

export default SignOut;
