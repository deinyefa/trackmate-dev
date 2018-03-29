import React from 'react';
import { Button } from 'reactstrap';

import { auth } from '../firebase';

const SignOut = () => (
  <Button type="button" onClick={auth.doSignOut}>
    Sign Out
  </Button>
);

export default SignOut;
