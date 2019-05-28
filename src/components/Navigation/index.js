import React from "react";

import { AuthUserContext } from "../Session";

import NavigationNonAuth from './NavigationNonAuth';
import NavigationAuth from './NavigationAuth';

const Navigation = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser =>
				authUser ? <NavigationAuth /> : <NavigationNonAuth />
			}
		</AuthUserContext.Consumer>
	</div>
);


export { Navigation };
