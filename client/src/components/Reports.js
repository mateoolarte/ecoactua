import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import "../styles/TableReports.css";
import "../styles/Form.css";

export class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  componentDidMount() {
    axios.get("/api/reportes")
      .then(response => this.setState({ reports: response.data }))
      .catch(error => console.log(error));
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Todos los reportes</title>
        </Helmet>
        <h1 className="heading text-center">Reportes</h1>
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
              key={report._id}
              address={report.address}
              description={report.description}
              reportState={report.state}
              position={{
                lat: parseFloat(report.pointlat),
                lng: parseFloat(report.pointlong)
              }}
              onClick={this.onMarkerClick}
              icon={{
                url:
                  "https://raw.githubusercontent.com/mateoolarte/ecoactua/rails/public/point-map.png"
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
        <section className="table-reports">
          <header className="order-in-table">
            <h4 className="table-reports__title">Reportes</h4>
            <h4 className="table-reports__title text-center">
              Tipo de reporte
            </h4>
            <h4 className="table-reports__title text-center">Estado</h4>
          </header>

          {this.state.reports.map(report => (
            <article className="table-reports__item order-in-table" key={report._id}>
              <p className="table-reports__text">{report.description}</p>
              <span className="form-report__types-box block-click">
                <span
                  className={`form-report__types-icon ${report.type.toLowerCase()}-type`}
                >
                  <i className={`icon-${report.type.toLowerCase()}-icon`} />
                </span>
                <em className="form-report__types-text">{report.type}</em>
              </span>
              <span
                className={`table-reports__state state-color-${
                  report.state === "En revisión" ? "Revision" : report.state
                }`}
              >
                <i
                  className={`icon-${
                    report.state === "En revisión"
                      ? "revision"
                      : report.state.toLowerCase()
                  }-icon`}
                />
                {report.state}
              </span>
            </article>
          ))}
        </section>
      </Fragment>
    );
  }
}

const LoadingContainer = props => <div>Fancy loading container!</div>;

export default GoogleApiWrapper({
  apiKey: "AIzaSyAD7fBDU_tVmqTL_zqIAVC_317qfyYH7Js",
  LoadingContainer: LoadingContainer
})(Reports);
