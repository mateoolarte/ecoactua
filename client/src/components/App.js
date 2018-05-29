import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import RouteWithProps from "./utils/RouteWithProps";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import HomePage from "./HomePage";
import Reports from "./Reports";
import Report from "./Report";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Admin from "./Admin";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      isAuth: false,
      isUserAdmin: false,
      notification: "",
      redirectPage: false
    };

    this.userIsAuth = this.userIsAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      this.setState({
        isAuth: true,
        isUserAdmin: currentUser.role === "admin" ? true : false,
        currentUser: currentUser,
        notification: ""
      });
    }
  }

  userIsAuth(currentUser, token, notification = "") {
    delete currentUser["password"];
    localStorage.setItem("tokenUser", token);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    this.setState({
      currentUser: currentUser,
      isAuth: true,
      isUserAdmin: currentUser.role === "admin" ? true : false,
      notification: notification,
      redirectPage: true
    });
  }

  logout() {
    localStorage.clear();

    this.setState({
      isAuth: false,
      isUserAdmin: false,
      redirectPage: window.location.hash === "#/" ? false : true
    });
  }

  removeAlert(event) {
    const alertContainer = event.target.closest(".alert");
    alertContainer.classList.remove("alert--active");

    this.setState({
      notification: ""
    });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header
            userSigned={this.state.isAuth}
            currentUser={this.state.currentUser}
            logout={this.logout}
          />

          <RouteWithProps
            path="/ingresar"
            component={Login}
            getDataUser={this.userIsAuth}
            userSigned={this.state.isAuth}
          />

          <RouteWithProps
            path="/registrarse"
            component={Signup}
            getDataUser={this.userIsAuth}
            userSigned={this.state.isAuth}
          />

          <RouteWithProps
            exact
            path="/"
            component={HomePage}
            notification={this.state.notification}
            closeAlert={this.removeAlert}
          />

          <Route path="/reportes" component={Reports} />

          <PrivateRoute
            path="/reporte"
            credential={this.state.isAuth}
            component={Report}
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
