import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import qs from "qs";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      LastName: "",
      username: "",
      email: "",
      password: "",
      notification: "",
      redirectPage: false
    };

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleFirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastName(event) {
    this.setState({
      LastName: event.target.value
    });
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSignup(event) {
    event.preventDefault();

    axios
      .post("/api/signup", qs.stringify(this.state))
      .then(response => {
        let alert = document.querySelector(".alert");
        let alertText = document.querySelector(".alertText");
        const text = document.createTextNode(response.data.notification);

        alert.classList.add("alert--active", "alert--success");
        alertText.appendChild(text);

        this.setState({
          firstName: "",
          LastName: "",
          username: "",
          email: "",
          password: "",
          notification: response.data.notification,
          redirectPage: true
        });
      })
      .catch(error => console.log(error));
  }

  handleRemoveAlert(event) {
    const alertContainer = event.target.closest(".alert");
    alertContainer.classList.remove("alert--active");
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Registrarse</title>
        </Helmet>
        {this.state.redirectPage && (
          <Redirect
            to={{
              pathname: "/reportes",
              state: { notification: this.state.notification }
            }}
          />
        )}

        {this.props.userSigned && <Redirect to={{ pathname: "/" }} />}
        <div className="alert">
          <p className="alertText" />
          <button className="alertBtn" onClick={this.handleRemoveAlert}>
            <i className="icon-delete-icon" />
          </button>
        </div>
        <section className="form__auth margin-bottom-50">
          <h2 className="text-center">Registrarse</h2>
          <form onSubmit={this.handleSignup}>
            <input
              type="text"
              placeholder="Nombre"
              value={this.state.firstName}
              onChange={this.handleFirstName}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={this.state.LastName}
              onChange={this.handleLastName}
            />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={this.state.username}
              onChange={this.handleUsername}
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={this.state.email}
              onChange={this.handleEmail}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handlePassword}
              required
            />
            <span>(Mínimo 6 caracteres)</span> <br />
            <div className="text-center">
              <input
                type="submit"
                value="Registrarse"
                className="btn btn-primary btn-large"
              />
            </div>
          </form>
          <Link to="/ingresar">¿Ya tienes cuenta? Ingresa aquí</Link>
        </section>
      </Fragment>
    );
  }
}
