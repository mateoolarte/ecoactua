import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import "../styles/HomePage.css";
import "../styles/Map.css";

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      notification: this.props.notification
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.changeSectionAnimation = this.changeSectionAnimation.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/reportes")
      .then(response => this.setState({ reports: response.data }))
      .catch(error => console.log(error.response.data));

    if (this.state.notification !== "") {
      let alert = document.querySelector(".alert");
      let alertText = document.querySelector(".alertText");
      const notification = document.createTextNode(this.state.notification);

      alert.classList.add("alert--active", "alert--success");
      alertText.appendChild(notification);
    }
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  changeSectionAnimation() {
    const heroSection = document.querySelector(".home__hero").offsetHeight;

    window.scroll({
      top: heroSection,
      behavior: "smooth"
    });
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Inicio</title>
        </Helmet>
        {this.state.notification !== "" && (
          <div className="alert">
            <p className="alertText" />
            <button className="alertBtn" onClick={this.props.closeAlert}>
              <i className="icon-delete-icon" />
            </button>
          </div>
        )}
        <section className="home__hero">
          <div className="home__hero-container text-center">
            <h1 className="home__hero-description">
              <strong>Ecoactua</strong> busca mantener y conservar nuestros
              recursos naturales, con nuestra ayuda intentamos
              <strong> solucionar las problemáticas ambientales</strong> que se
              presenten en la ciudad.
            </h1>
            <h2 className="home__hero-clt-title">
              ¿Quieres ser parte del cambio?
            </h2>
            <span
              className="btn btn-primary btn-large"
              onClick={this.changeSectionAnimation}
            >
              Conoce como funciona
            </span>
          </div>
        </section>

        <section className="home__how-works">
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
          <Map
            google={this.props.google}
            zoom={13}
            initialCenter={{
              lat: 6.249451,
              lng: -75.576035
            }}
            className="generalMap"
            onClick={this.onMapClicked}
          >
            {this.state.reports.map(report => (
              <Marker
                key={report.id}
                address={report.address}
                description={report.description}
                reportState={report.state}
                position={{
                  lat: parseFloat(report.pointlat),
                  lng: parseFloat(report.pointlong)
                }}
                onClick={this.onMarkerClick}
                icon={{
                  url: "favicon.ico"
                }}
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div className="generalMap__window-container">
                <h3 className="generalMap__window-title">
                  Dirección: {this.state.selectedPlace.address}
                </h3>
                <p className="generalMap__window-description">
                  <strong>Descripción: </strong>
                  {this.state.selectedPlace.description}
                </p>
                <div
                  className={`state-color-${
                    this.state.selectedPlace.reportState === "En revisión"
                      ? "Revision"
                      : this.state.selectedPlace.reportState
                  }`}
                >
                  <strong>Estado del reporte: </strong>
                  <span>{this.state.selectedPlace.reportState}</span>
                </div>
                <h1>{}</h1>
              </div>
            </InfoWindow>
          </Map>
        </section>
      </Fragment>
    );
  }
}

const LoadingContainer = props => <div>Fancy loading container!</div>;

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_GOOGLE_MAPS,
  LoadingContainer: LoadingContainer
})(HomePage);
