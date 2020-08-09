import React, { Component, Fragment } from "react";
import axios from "axios";
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
      selectedPlace: {},
      addressFilter: "",
      typeReportFilter: "",
      stateFilter: "",
      notification: ""
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleDropdownStates = this.handleDropdownStates.bind(this);
    this.updateReport = this.updateReport.bind(this);
    this.removeReport = this.removeReport.bind(this);
    this.getAddressFilter = this.getAddressFilter.bind(this);
    this.stateFilter = this.stateFilter.bind(this);
    this.filterByAddress = this.filterByAddress.bind(this);
    this.typeReportFilter = this.typeReportFilter.bind(this);
    this.filterByTypeReport = this.filterByTypeReport.bind(this);
    this.filterByState = this.filterByState.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/reportes")
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

  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  handleDropdownStates(event) {
    const currentElement = event.target.closest(".admin__update-state");
    const icon = currentElement.querySelector(".caret").classList;
    const dropdown = currentElement.querySelector(".admin__update-dropdown")
      .classList;
    icon.toggle("rotate-caret");
    dropdown.toggle("admin__update-dropdown-active");
  }

  updateReport(event) {
    const currentElement = event.target.closest(".admin__update-state");

    axios({
      url: "/api/reporte",
      method: "put",
      data: {
        id: currentElement
          .querySelector(".admin__update-dropdown")
          .getAttribute("id"),
        state: event.target.textContent
      },
      headers: { "x-access-token": localStorage.getItem("tokenUser") }
    })
      .then(response => {
        let dropdown = document.querySelectorAll(".admin__update-dropdown");
        let iconCaret = document.querySelectorAll(".caret");

        dropdown.forEach(menu =>
          menu.classList.remove("admin__update-dropdown-active")
        );

        iconCaret.forEach(icon => icon.classList.remove("rotate-caret"));

        axios
          .get("/api/reportes")
          .then(response =>
            this.setState({
              reports: response.data,
              showingInfoWindow: false,
              activeMarker: null
            })
          )
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  removeReport(e) {
    const currentReport = e.target
      .closest(".table-reports__delete")
      .getAttribute("id");

    axios({
      url: "/api/reporte",
      method: "delete",
      params: { id: currentReport },
      headers: { "x-access-token": localStorage.getItem("tokenUser") }
    })
      .then(response => {
        axios
          .get("/api/reportes")
          .then(response =>
            this.setState({
              reports: response.data,
              showingInfoWindow: false,
              activeMarker: null
            })
          )
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  getAddressFilter(e) {
    this.setState({
      addressFilter: e.target.value
    });
  }

  stateFilter(e) {
    this.setState({
      stateFilter: e.target.value
    });
  }

  typeReportFilter(e) {
    this.setState({
      typeReportFilter: e.target.value
    });
  }

  filterByAddress(report) {
    return report.address.includes(this.state.addressFilter);
  }

  filterByTypeReport(report) {
    return report.type.includes(this.state.typeReportFilter);
  }

  filterByState(report) {
    return report.state.includes(this.state.stateFilter);
  }

  render() {
    return (
      <Fragment>
        <h1 className="heading text-center">Administración Reportes</h1>
        <div className="admin__search">
          <form>
            <input
              type="text"
              placeholder="Buscar por dirección del reporte"
              onChange={this.getAddressFilter}
              value={this.state.addressFilter}
            />
            <select
              value={this.state.typeReportFilter}
              onChange={this.typeReportFilter}
            >
              <option label="Tipo de reporte" />
              <option value="Vegetación">Vegetación</option>
              <option value="Animal">Animal</option>
              <option value="Superficie">Superficie</option>
              <option value="Aire">Aire</option>
              <option value="Agua">Agua</option>
            </select>
            <select value={this.state.stateFilter} onChange={this.stateFilter}>
              <option label="Estado del reporte" />
              <option value="Pendiente">Pendiente</option>
              <option value="En revisión">En revisión</option>
              <option value="Solucionado">Solucionado</option>
            </select>
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

          {this.state.reports
            .filter(this.filterByAddress)
            .filter(this.filterByTypeReport)
            .filter(this.filterByState)
            .map(report => (
              <article
                className="table-reports__item order-in-table order-in-table--alt"
                key={report.id}
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

                  <ul className="admin__update-dropdown" id={report.id}>
                    {this.state.reportStates.map((reportState, i) => (
                      <li key={i} onClick={this.updateReport}>
                        {reportState !== report.state && (
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
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  className="table-reports__delete"
                  onClick={this.removeReport}
                  id={report.id}
                >
                  <i className="icon icon-delete-icon" />
                  Eliminar
                </span>
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
      </Fragment>
    );
  }
}

const LoadingContainer = props => <div>Fancy loading container!</div>;

export default GoogleApiWrapper({
  apiKey: "AIzaSyAD7fBDU_tVmqTL_zqIAVC_317qfyYH7Js",
  LoadingContainer: LoadingContainer
})(Admin);
