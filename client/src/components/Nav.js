import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

import defaultPhoto from "../images/default-photo-profile.png";

export default class Nav extends Component {
  constructor() {
    super();

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    const breakpoint = window.matchMedia("(max-width: 1023px)"),
      mainMenu = document.querySelector(".main-nav");

    // Change Mobile/Desktop menu
    if (breakpoint.matches) {
      mainMenu.classList.add("main-nav--mobile");
    } else {
      mainMenu.classList.remove("main-nav--mobile");
    }
  }

  toggleMenu() {
    const sidebarBox = document.querySelector(".main-nav--mobile"),
      sidebarBtn = document.querySelector(".btn--menu-mobile");

    sidebarBtn.classList.toggle("active");
    sidebarBox.classList.toggle("active");
  }

  toggleDropdown(e) {
    const caretIcon = document.querySelector(".btn--dropdown .caret")
    const navDropdown = document.querySelector(".main-nav__dropdown");

    caretIcon.classList.toggle("rotate-caret");
    navDropdown.classList.toggle("open-menu-dropdown");
  }

  render() {
    const currentURL = window.location.pathname;
    const userSigned = true;
    const firstName = "Mateo";
    const lastName = "Olarte";

    let classLinkNav = "main-nav__link";
    let classBtnMobile = "btn--menu-mobile";
    let classCaretIcon = "caret";

    if (currentURL === "/") {
      classLinkNav += " main-nav__link--white";
      classBtnMobile += " btn--menu-mobile--white";
      classCaretIcon += " caret--white";
    }

    return (
      <Fragment>
        <div className={classBtnMobile} onClick={this.toggleMenu}>
          <span className="top" />
          <span className="middle" />
          <span className="bottom" />
        </div>

        <nav className="main-nav">
          {userSigned && (
            <div className="main-nav-mobile__auth user-signed--mobile">
              <img
                src={defaultPhoto}
                className="header__avatar"
                alt="Foto de perfil"
              />
              <h3 className="main-nav-mobile__username">{`${firstName} ${lastName}`}</h3>
              <div className="main-nav--mobile__actions">
                <Link to="/">Mi perfil</Link>
                <Link to="/" className="logout-link">
                  Salir
                </Link>
              </div>
              <hr className="line-separator" />
            </div>
          )}

          {!userSigned && (
            <div className="main-nav-mobile__auth text-center">
              <Link to="/" className="main-nav-mobile__link">
                Ingresar
              </Link>
              {" / "}
              <Link to="/" className="main-nav-mobile__link">
                Registrarse
              </Link>
              <hr className="line-separator" />
            </div>
          )}

          <ul className="main-nav-mobile__list text-center">
            <li className="main-nav-mobile__item">
              <Link to="/" className="main-nav__link">
                Inicio
              </Link>
            </li>
            <li className="main-nav-mobile__item">
              <Link to="/reportes" className="main-nav__link">
                Reportes
              </Link>
            </li>
            <li className="main-nav-mobile__item">
              <Link to="/" className="btn btn-primary">
                Crear reporte
              </Link>
            </li>
          </ul>

          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to="/" className={classLinkNav}>
                Inicio
              </Link>
            </li>
            <li className="main-nav__item">
              <Link to="/reportes" className={classLinkNav}>
                Reportes
              </Link>
            </li>

            {userSigned && (
              <li className="main-nav__item dropdown-element">
                <button
                  className="btn--dropdown user-signed"
                  type="button"
                  onClick={this.toggleDropdown}
                >
                  <img
                    src={defaultPhoto}
                    className="header__avatar"
                    alt="Foto de perfil"
                  />
                  <span className={classCaretIcon} />
                </button>
                <ul className="main-nav__dropdown">
                  <li className="main-nav__dropdown-item">
                    <a href="/">Mi perfil</a>
                  </li>
                  <li className="main-nav__dropdown-item">
                    <Link to="/" className="logout-link">
                      Salir
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {!userSigned && (
              <li className="main-nav__item">
                <Link to="/" className={classLinkNav}>
                  Ingresar
                </Link>
                {" / "}
                <Link to="/" className={classLinkNav}>
                  Registrarse
                </Link>
              </li>
            )}

            <li className="main-nav__item">
              <Link to="/" className="btn btn-primary">
                Crear reporte
              </Link>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}