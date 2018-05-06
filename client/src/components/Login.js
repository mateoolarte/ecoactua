import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import qs from "qs";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();

    axios
      .post("/api/login", qs.stringify(this.state))
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <section className="form__auth margin-bottom-50">
        <Helmet>
          <title>Ecoactua - Ingresar</title>
        </Helmet>
        <h2 className="text-center">Ingresar</h2>
        <form onSubmit={this.handleLogin}>
          <input
            type="text"
            value={this.state.username}
            placeholder="Nombre de usuario"
            onChange={this.handleUsername}
            required
          />
          <input
            type="password"
            value={this.state.password}
            placeholder="Contraseña"
            onChange={this.handlePassword}
            required
          />
          {/* <input type="checkbox" /> */}
          {/* <label htmlFor="">Recuerdame</label> */}
          <div className="text-center">
            <input
              type="submit"
              value="Ingresar"
              className="btn btn-primary btn-large"
            />
          </div>
        </form>
        <Link to="/registrarse">Registrarse</Link> <br />
        {/* <Link to="/">¿Olvidaste tu constraseña?</Link> */}
      </section>
    );
  }
}
