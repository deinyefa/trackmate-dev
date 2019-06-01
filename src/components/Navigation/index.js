import React from "react";

import { AuthUserContext } from "../Session";

import NavigationNonAuth from "./NavigationNonAuth";
import NavigationAuth from "./NavigationAuth";
import Spinner from "../UI/Spinner/Spinner";

const Navigation = () => {

  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => {
          
          switch (authUser) {
            case null:
              return <NavigationNonAuth />;
            case authUser:
              return <NavigationAuth />
            default:
              return <Spinner />
          }
        }}
      </AuthUserContext.Consumer>
    </div>
  );
}

export { Navigation };
