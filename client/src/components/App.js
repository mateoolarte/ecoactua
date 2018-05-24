import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
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
    this.clearSession = this.clearSession.bind(this);
  }

  componentDidMount() {
    const dataLocalStorage = JSON.parse(localStorage.getItem("currentUser"));

    if (dataLocalStorage) {
      this.setState({
        userSigned: true,
        isUserAdmin: dataLocalStorage.role === "admin" ? true : false,
        currentUser: dataLocalStorage,
        notification: ""
      });
    }
  }

  signInUser(email, password) {
    axios
      .post("/api/ingresar", {
        email: email,
        password: password
      })
      .then(response => {
        const data = response.data;
        delete data.currentUser["password"];
        localStorage.setItem("tokenUser", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.currentUser));

        this.setState({
          currentUser: data.currentUser,
          userSigned: true,
          isUserAdmin: data.currentUser.role === "admin" ? true : false,
          notification: data.notification,
          redirectPage: true
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response.data.notification
        });
      });
  }

  clearSession() {
    localStorage.clear();

    this.setState({
      userSigned: false,
      isUserAdmin: false,
      redirectPage: window.location.hash === "#/" ? false : true
    });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header
            userSigned={this.state.userSigned}
            currentUser={this.state.currentUser}
            clearSession={this.clearSession}
          />

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
            userSigned={this.state.userSigned}
          />

          <RouteWithProps
            path="/registrarse"
            component={Signup}
            userSigned={this.state.userSigned}
          />

          <Route path="/usuario/:username" component={Profile} />

          <PrivateRoute
            path="/administracion"
            credential={this.state.isUserAdmin}
            component={Admin}
          />
          <Footer />
        </Fragment>
      </Router>
    );
  }
}
