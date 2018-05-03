import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default class Login extends Component {
  render() {
    return (
      <section className="form__auth margin-bottom-50">
        <Helmet>
          <title>Ecoactua - Ingresar</title>
        </Helmet>
        <h2 className="text-center">Ingresar</h2>
        <form>
          <input type="text" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <input type="checkbox" />
          <label htmlFor="">Recuerdame</label>
          <div className="text-center">
            <input
              type="submit"
              value="Ingresar"
              className="btn btn-primary btn-large"
            />
          </div>
        </form>
        <Link to="/registrarse">Registrarse</Link> <br />
        <Link to="/">¿Olvidaste tu constraseña?</Link>
      </section>
    );
  }
}
