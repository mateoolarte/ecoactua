import React from "react";
import { Link } from "react-router-dom";

import Nav from "./Nav";

import "../styles/Header.css";
import logo from "../images/logos/logo-black.svg";
import logoHome from "../images/logos/logo-white.svg";

export default function Header() {
  const currentURL = window.location.hash;
  let currentLogo = logoHome;

  if (currentURL !== "#/") {
    currentLogo = logo;
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={currentLogo} alt="Logo ecoactua" />
      </Link>

      <Nav />
    </header>
  );
}
