import React from "react";
import { Route } from "react-router-dom";

function RouteWithProps({
  path,
  exact,
  strict,
  component: Component,
  location,
  ...rest
}) {
  return (
    <Route
      path={path}
      exact={exact}
      strict={strict}
      location={location}
      render={props => <Component {...props} {...rest} />}
    />
  );
}

export default RouteWithProps;
