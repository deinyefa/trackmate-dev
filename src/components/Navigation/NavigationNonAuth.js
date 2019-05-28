import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const NavigationNonAuth = () => (
	<ul>
		<li>
			<Link to={ROUTES.LANDING}>trackmate</Link>
		</li>
		<li>
			<Link to={ROUTES.SIGN_IN}>Sign In</Link>
		</li>
	</ul>
);

export default NavigationNonAuth;