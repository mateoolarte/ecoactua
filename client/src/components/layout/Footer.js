import React from "react";
import "../../styles/Footer.css";

function Footer() {
  const currentYear = new Date();

  return (
    <footer className="footer">
      <p>© Ecoactua {currentYear.getFullYear()}</p>
      <p className="footer__develop-by">
        Hecho con ♥ desde Medellín, Desarrollado por{" "}
        <a
          href="https://mateoolarte.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mateo Olarte
        </a>{" "}
        - Diseñado por{" "}
        <a
          href="http://danielcarta.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Daniel Cartagena
        </a>
      </p>
    </footer>
  );
}

export default Footer;
