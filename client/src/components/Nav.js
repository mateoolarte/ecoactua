import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

import defaultPhoto from "../images/default-photo-profile.png";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
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
    const caretIcon = document.querySelector(".btn--dropdown .caret");
    const navDropdown = document.querySelector(".main-nav__dropdown");

    caretIcon.classList.toggle("rotate-caret");
    navDropdown.classList.toggle("open-menu-dropdown");

    if (caretIcon.classList.contains("caret--white rotate-caret")) {
      navDropdown.classList.remove("open-menu-dropdown");
    }
  }

  closeMobileMenu() {
    const sidebarBox = document.querySelector(".main-nav--mobile"),
      sidebarBtn = document.querySelector(".btn--menu-mobile");

    sidebarBtn.classList.remove("active");
    sidebarBox.classList.remove("active");
  }

  render() {
    const currentURL = window.location.hash;
    const userSigned = false;
    const firstName = "Mateo";
    const lastName = "Olarte";

    let classLinkNav = "main-nav__link";
    let classLinkNavActive = "main-nav__link--active";
    let classBtnMobile = "btn--menu-mobile";
    let classCaretIcon = "caret";
    let classDropdownProfile = "main-nav__dropdown";

    if (currentURL === "#/") {
      classLinkNav += " main-nav__link--white";
      classLinkNavActive += " main-nav__link--activeWhite";
      classBtnMobile += " btn--menu-mobile--white";
      classCaretIcon += " caret--white";
      classDropdownProfile += " main-nav__dropdownHome";
    }
    return (
      <Fragment>
        <div className={classBtnMobile} onClick={this.toggleMenu}>
          <span className="top" />
          <span className="middle" />
          <span className="bottom" />
        </div>

        <nav className="main-nav">
          {userSigned ? (
            <div className="main-nav-mobile__auth user-signed--mobile">
              <img
                src={defaultPhoto}
                className="header__avatar"
                alt="Foto de perfil"
              />
              <h3 className="main-nav-mobile__username">{`${firstName} ${lastName}`}</h3>
              <div className="main-nav--mobile__actions">
                <NavLink to="/usuario/mateo" onClick={this.closeMobileMenu}>
                  Mi perfil
                </NavLink>
                <NavLink to="/" onClick={this.closeMobileMenu} className="logout-link">
                  Salir
                </NavLink>
              </div>
              <hr className="line-separator" />
            </div>
          ) : (
            <div className="main-nav-mobile__auth text-center">
              <NavLink to="/ingresar" onClick={this.closeMobileMenu} className="main-nav-mobile__link">
                Ingresar
              </NavLink>
              {" / "}
              <NavLink to="/registrarse" onClick={this.closeMobileMenu} className="main-nav-mobile__link">
                Registrarse
              </NavLink>
              <hr className="line-separator" />
            </div>
          )}

          <ul className="main-nav-mobile__list text-center">
            <li className="main-nav-mobile__item">
              <NavLink
                to="/"
                exact
                activeClassName={classLinkNavActive}
                className="main-nav__link"
                onClick={this.closeMobileMenu}
              >
                Inicio
              </NavLink>
            </li>
            <li className="main-nav-mobile__item">
              <NavLink
                to="/reportes"
                exact
                activeClassName={classLinkNavActive}
                className="main-nav__link"
                onClick={this.closeMobileMenu}
              >
                Reportes
              </NavLink>
            </li>
            <li className="main-nav-mobile__item">
              <NavLink to="/reporte" onClick={this.closeMobileMenu} className="btn btn-primary">
                Crear reporte
              </NavLink>
            </li>
          </ul>

          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                to="/"
                exact
                activeClassName={classLinkNavActive}
                className={classLinkNav}
              >
                Inicio
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                to="/reportes"
                exact
                activeClassName={classLinkNavActive}
                className={classLinkNav}
              >
                Reportes
              </NavLink>
            </li>

            {userSigned ? (
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
                <ul className={classDropdownProfile}>
                  <li className="main-nav__dropdown-item">
                    <NavLink to="/usuario/mateo">Mi perfil</NavLink>
                  </li>
                  <li className="main-nav__dropdown-item">
                    <NavLink to="/" className="logout-link">
                      Salir
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="main-nav__item">
                <NavLink
                  to="/ingresar"
                  exact
                  activeClassName={classLinkNavActive}
                  className={classLinkNav}
                >
                  Ingresar
                </NavLink>
                {" / "}
                <NavLink
                  to="/registrarse"
                  exact
                  activeClassName={classLinkNavActive}
                  className={classLinkNav}
                >
                  Registrarse
                </NavLink>
              </li>
            )}

            <li className="main-nav__item">
              <NavLink to="/reporte" className="btn btn-primary">
                Crear reporte
              </NavLink>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}
