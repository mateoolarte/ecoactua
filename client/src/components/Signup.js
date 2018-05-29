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
      lastName: "",
      username: "",
      email: "",
      password: "",
      notification: ""
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.getFirstName = this.getFirstName.bind(this);
    this.getLastName = this.getLastName.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
  }

  componentDidUpdate() {
    if (this.state.notification !== "") {
      let alert = document.querySelector(".alert");
      let alertText = document.querySelector(".alertText");
      const text = document.createTextNode(this.state.notification);

      alert.classList.add("alert--active", "alert--danger");
      alertText.innerHTML = "";
      alertText.appendChild(text);
    }
  }

  handleSignup(e) {
    e.preventDefault();

    if (this.state.password.length <= 5) {
      this.setState({
        notification: "La contraseña debe tener mínimo 6 caracteres."
      });
    } else {
      axios
        .post("/api/registrarse", qs.stringify(this.state))
        .then(response => {
          const { currentUser, token, notification } = response.data;

          this.props.getDataUser(currentUser, token, notification);

          this.setState({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            notification: notification
          });
        })
        .catch(err => {
          const { notification } = err.response.data;

          this.setState({
            username:
              notification === "Nombre de usuario en uso."
                ? ""
                : this.state.username,
            email:
              notification === "Correo electrónico en uso."
                ? ""
                : this.state.email,
            notification: notification
          });
        });
    }
  }

  getFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  getLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  getUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  getEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  getPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  removeAlert(e) {
    const alertContainer = e.target.closest(".alert");
    alertContainer.classList.remove("alert--active");
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Registrarse</title>
        </Helmet>

        {this.props.userSigned && <Redirect to={{ pathname: "/" }} />}

        {this.state.notification !== "" && (
          <div className="alert">
            <p className="alertText" />
            <button
              type="button"
              className="alertBtn"
              onClick={this.removeAlert}
            >
              <i className="icon-delete-icon" />
            </button>
          </div>
        )}

        <section className="form__auth margin-bottom-50">
          <h2 className="text-center">Registrarse</h2>
          <form onSubmit={this.handleSignup}>
            <input
              type="text"
              placeholder="Nombre"
              value={this.state.firstName}
              onChange={this.getFirstName}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={this.state.LastName}
              onChange={this.getLastName}
            />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={this.state.username}
              onChange={this.getUsername}
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={this.state.email}
              onChange={this.getEmail}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.getPassword}
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
