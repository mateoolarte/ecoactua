import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import Reports from "./Reports";

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
          <Route path="/reportes" component={Reports} />
        </Fragment>
      </Router>
    );
  }
}
