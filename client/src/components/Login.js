import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirectPage: false,
      notification: this.props.location.state
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
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

  handleLogin(event) {
    event.preventDefault();

    this.props.dataSignIn(this.state.email, this.state.password);
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

  handleRemoveAlert(event) {
    const alertContainer = event.target.closest(".alert");
    alertContainer.classList.remove("alert--active");

    this.setState({
      notification: undefined
    });
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Ingresar</title>
        </Helmet>
        {this.props.userSigned && <Redirect to={{ pathname: "/" }} />}

        {this.props.location.state !== undefined && (
          <div className="alert">
            <p className="alertText" />
            <button className="alertBtn" onClick={this.handleRemoveAlert}>
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
              onChange={this.handleEmail}
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
      </Fragment>
    );
  }
}
