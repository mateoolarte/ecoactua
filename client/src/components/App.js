import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import HomePage from "./HomePage";
import Reports from "./Reports";
import Report from "./Report";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Admin from "./Admin";

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
              state: {
                from: props.location,
                notification: "Debes ingresar o estar registrado para acceder"
              }
            }}
          />
        )
      }
    />
  );
}

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

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      userSigned: false,
      isUserAdmin: false,
      notification: "",
      redirectPage: false
    };

    this.signInUser = this.signInUser.bind(this);
  }

  signInUser(email, password) {
    axios
      .post("/api/ingresar", {
        email: email,
        password: password
      })
      .then(response => {
        const data = response.data;

        this.setState({
          currentUser: data.currentUser,
          userSigned: true,
          isUserAdmin: data.currentUser.role === "admin" ? true : false,
          notification: data.notification,
          redirectPage: true
        });
      })
      .catch(err => console.log(err.response));
  }

  handleRemoveAlert(event) {
    const alertContainer = event.target.closest(".alert");
    alertContainer.classList.remove("alert--active");
  }

  render() {
    console.log(this.state.currentUser);

    return (
      <Router>
        <Fragment>
          <Header userSigned={this.state.userSigned} />
          <RouteWithProps
            exact
            path="/"
            component={HomePage}
            notification={this.state.notification}
          />
          <Route path="/reportes" component={Reports} />
          <PrivateRoute
            path="/reporte"
            credential={this.state.userSigned}
            component={Report}
          />
          <RouteWithProps
            path="/ingresar"
            component={Login}
            dataSignIn={this.signInUser}
            redirectPage={this.state.redirectPage}
          />
          <Route path="/registrarse" component={Signup} />
          <Route path="/usuario/:username" component={Profile} />
          <PrivateRoute
            path="/administracion"
            credential={this.state.isUserAdmin}
            component={Admin}
          />
        </Fragment>
      </Router>
    );
  }
}
