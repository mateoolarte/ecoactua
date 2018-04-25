import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <title>Ecoactua - Inicio</title>
      </Helmet>
      <section className="home__hero">
        <div className="home__hero-container text-center">
          <h1 className="home__hero-description">
            <strong>Ecoactua</strong> busca mantener y conservar nuestros
            recursos naturales, con nuestra ayuda intentamos
            <strong>solucionar las problemáticas ambientales</strong> que se
            presenten en la ciudad.
          </h1>
          <h2 className="home__hero-clt-title">
            ¿Quieres ser parte del cambio?
          </h2>
          <a href="#como-funciona" className="btn btn-primary btn-large">
            Conoce como funciona
          </a>
        </div>
      </section>

      <section id="como-funciona" className="home__how-works">
        <p className="home__how-works-description text-center">
          Contamos con el apoyo de las autoridades capacitadas para resolver
          cualquier inconveniente
        </p>

        <div className="home__how-works-container">
          <h3 className="text-center">¿Cómo funciona?</h3>

          <div className="home__how-works-box">
            <article className="home__how-works-item">
              <div className="home__how-works-content step-one">
                <i className="icon icon-step-one" />
                <h3>Crea un reporte que requiera atención</h3>
              </div>
              <p className="text-center">
                ¿Existe un problema ambiental en tu zona?
              </p>
            </article>

            <article className="home__how-works-item">
              <div className="home__how-works-content step-two">
                <i className="icon icon-step-two" />
                <h3>El reporte llega a las autoridades capacitadas</h3>
              </div>
              <p className="text-center">
                Se realiza un análisis de tu problema para hallar la solución
                más conveniente
              </p>
            </article>

            <article className="home__how-works-item">
              <div className="home__how-works-content step-three">
                <i className="icon icon-step-three" />
                <h3>Solucionado el problema</h3>
              </div>
              <p className="text-center">
                Se actualiza el estado del mismo y recibirás una notificación
                para mantenerte al tanto
              </p>
            </article>
          </div>

          <div className="home__how-works-btn text-center">
            <Link to="/reporte" className="btn btn-primary btn-large">
              Crear tu reporte
            </Link>
          </div>
        </div>
      </section>

      <section className="home__all-reports">
        <h3 className="text-center">Conoce todos los reportes</h3>

        <div id="map_general" />
      </section>
    </Fragment>
  );
}
