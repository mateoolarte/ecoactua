import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import Reports from "./Reports";
import Report from "./Report";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Admin from "./Admin";

export default class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     reports: []
  //   };
  // }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ reports: res }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch("/api/usuarios");
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/reportes" component={Reports} />
          <Route exact path="/reporte" component={Report} />
          <Route exact path="/ingresar" component={Login} />
          <Route exact path="/registrarse" component={Signup} />
          <Route exact path="/usuario/:username" component={Profile} />
          <Route exact path="/administracion" component={Admin} />
        </Fragment>
      </Router>
    );
  }
}
