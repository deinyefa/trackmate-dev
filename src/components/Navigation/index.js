import React from "react";

import { AuthUserContext } from "../Session";

import NavigationNonAuth from "./NavigationNonAuth";
import NavigationAuth from "./NavigationAuth";
import Spinner from "../UI/Spinner/Spinner";

const Navigation = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser => {
				switch (authUser) {
					case null:
						return <Spinner />;
					default:
						return authUser ? (
							<NavigationAuth />
						) : (
							<NavigationNonAuth />
						);
				}
			}}
		</AuthUserContext.Consumer>
	</div>
);

export { Navigation };
