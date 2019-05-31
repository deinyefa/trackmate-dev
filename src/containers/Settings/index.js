import React, { Fragment } from "react";
import { Row } from "reactstrap";

import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import UpdateBillingInfo from "./UpdateBillingInfo";

const SettingsPage = () => (
	<Fragment>
		<h1>Settings</h1>
		<Row>
      <UpdateProfile />
      <UpdatePassword />
      <UpdateBillingInfo />
    </Row>
	</Fragment>
);

export default SettingsPage;
