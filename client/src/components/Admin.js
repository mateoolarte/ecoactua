import React, { Component, Fragment } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import "../styles/Admin.css";

export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      reportStates: ["Pendiente", "En revisión", "Solucionado"],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleDropdownStates = this.handleDropdownStates.bind(this);
  }

  componentDidMount() {
    this.setState({
      reports: [
        {
          state: "Pendiente",
          _id: "5ad82887c6f83f48b9e67446",
          address: "Calle 44C # 91-54",
          description: "Hi I'm a first report from Nodejs",
          pointlat: "6.258718871246735",
          pointlong: "-75.5584397088623",
          type: "Vegetación",
          __v: 0
        },
        {
          state: "En revisión",
          _id: "5ad83660c47d4d4edde66b6c",
          address: "Hola",
          description: "Mundo",
          pointlat: "6.245846190991079",
          pointlong: "-75.59165618530272",
          type: "Animal",
          __v: 0
        }
      ]
    });
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

  handleDropdownStates(event) {
    const currentElement = event.target.closest(".admin__update-state");
    const icon = currentElement.querySelector(".caret").classList;
    const dropdown = currentElement.querySelector(".admin__update-dropdown")
      .classList;
    icon.toggle("rotate-caret");
    dropdown.toggle("admin__update-dropdown-active");
  }

  render() {
    return (
      <Fragment>
        <h1 className="heading text-center">Administración Reportes</h1>
        <div className="admin__search">
          <form>
            <input
              type="text"
              name="description"
              placeholder="Buscar descripción del reporte"
            />
            <select name="state" id="">
              <option value="" label="Estado del reporte" />
              <option value="Pendiente">Pendiente</option>
              <option value="En revisión">En revisión</option>
              <option value="Solucionado">Solucionado</option>
            </select>
            <select name="state" id="">
              <option value="" label="Tipo de reporte" />
              <option value="Vegetación">Vegetación</option>
              <option value="Animal">Animal</option>
              <option value="Superficie">Superficie</option>
              <option value="Aire">Aire</option>
              <option value="Agua">Agua</option>
            </select>
            <button type="submit">
              <i className="icon icon-search-icon" />
            </button>
          </form>
        </div>

        <section className="table-reports">
          <header className="order-in-table order-in-table--alt">
            <h4 className="table-reports__title">Reportes</h4>
            <h4 className="table-reports__title text-center">
              Tipo de reporte
            </h4>
            <h4 className="table-reports__title text-center">Estado</h4>
            <h4 className="table-reports__title text-center">Eliminar</h4>
          </header>

          {this.state.reports.map(report => (
            <article
              className="table-reports__item order-in-table order-in-table--alt"
              key={report._id}
            >
              <p className="table-reports__text">{report.description}</p>

              <span className="form-report__types-box block-click">
                <span
                  className={`form-report__types-icon ${report.type.toLowerCase()}-type`}
                >
                  <i className={`icon-${report.type.toLowerCase()}-icon`} />
                </span>
                <em className="form-report__types-text">{report.type}</em>
              </span>

              <div className="admin__update-state">
                <span
                  className={`table-reports__state state-color-${
                    report.state === "En revisión" ? "Revision" : report.state
                  }`}
                  onClick={this.handleDropdownStates}
                >
                  <i
                    className={`icon-${
                      report.state === "En revisión"
                        ? "revision"
                        : report.state.toLowerCase()
                    }-icon`}
                  />
                  {report.state} <span className="caret" />
                </span>

                <ul className="admin__update-dropdown">
                  {this.state.reportStates.map((reportState, i) => (
                    <li key={i}>
                      {reportState !== report.state && (
                        <a href="/">
                          <span
                            className={`table-reports__state state-color-${
                              reportState === "En revisión"
                                ? "Revision"
                                : reportState
                            }`}
                          >
                            <i
                              className={`icon-${
                                reportState === "En revisión"
                                  ? "revision"
                                  : reportState.toLowerCase()
                              }-icon`}
                            />
                            {reportState}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/" className="table-reports__delete">
                <i className="icon icon-delete-icon" />
                Eliminar
              </a>
            </article>
          ))}
        </section>
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
      </Fragment>
    );
  }
}

const LoadingContainer = props => <div>Fancy loading container!</div>;

export default GoogleApiWrapper({
  apiKey: "AIzaSyAD7fBDU_tVmqTL_zqIAVC_317qfyYH7Js",
  LoadingContainer: LoadingContainer
})(Admin);
