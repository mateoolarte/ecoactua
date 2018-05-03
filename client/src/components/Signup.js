import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default class Signup extends Component {
  render() {
    return (
      <section className="form__auth margin-bottom-50">
        <Helmet>
          <title>Ecoactua - Registrarse</title>
        </Helmet>
        <h2 className="text-center">Registrarse</h2>
        <form>
          <input type="text" name="firstname" placeholder="Nombre" />
          <input type="text" name="lastname" placeholder="Apellido" />
          <input type="text" name="username" placeholder="Nombre de usuario" />
          <input type="email" name="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
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
    );
  }
}
