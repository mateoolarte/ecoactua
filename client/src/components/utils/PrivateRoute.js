import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, credential, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        credential ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/ingresar",
              state: "Debes ingresar o estar registrado para acceder."
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
