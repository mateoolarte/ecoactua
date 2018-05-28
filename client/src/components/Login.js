import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      notification: this.props.location.state
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }

  componentDidMount() {
    if (this.state.notification !== undefined) {
      let alert = document.querySelector(".alert");
      let alertText = document.querySelector(".alertText");
      const notification = document.createTextNode(this.state.notification);

      alert.classList.add("alert--active", "alert--danger");
      alertText.appendChild(notification);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.notification !== undefined) {
      let alert = document.querySelector(".alert");
      let alertText = document.querySelector(".alertText");
      const notification = document.createTextNode(this.state.notification);

      alert.classList.add("alert--active", "alert--danger");
      alertText.appendChild(notification);
    }
  }

  handleLogin(e) {
    e.preventDefault();

    axios
      .post("/api/ingresar", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        const { currentUser, token, notification } = response.data;

        this.props.getDataLogin(currentUser, token, notification);
      })
      .catch(err => {
        this.setState({
          notification: err.response.data.notification,
          email:
            err.response.data.notification === "La contraseña es incorrecta."
              ? this.state.email
              : "",
          password: ""
        });
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

    this.setState({
      notification: undefined
    });
  }

  render() {
    console.log(this.state.notification);

    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Ingresar</title>
        </Helmet>

        {this.props.userSigned && <Redirect to={{ pathname: "/" }} />}

        {this.state.notification !== undefined && (
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
          <h2 className="text-center">Ingresar</h2>
          <form onSubmit={this.handleLogin}>
            <input
              type="text"
              value={this.state.email}
              placeholder="Correo electrónico"
              onChange={this.getEmail}
              required
            />
            <input
              type="password"
              value={this.state.password}
              placeholder="Contraseña"
              onChange={this.getPassword}
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
          <Link to="/registrarse">Registrarse</Link>
          {/* <Link to="/">¿Olvidaste tu constraseña?</Link> */}
        </section>
      </Fragment>
    );
  }
}
