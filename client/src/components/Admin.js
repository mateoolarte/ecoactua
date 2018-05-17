import React, { Component, Fragment } from "react";
import axios from "axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import "../styles/Admin.css";

export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      reportsFiltered: [],
      reportStates: ["Pendiente", "En revisión", "Solucionado"],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      notification: "",
      descriptionFilter: "",
      stateFilter: "",
      typeReportFilter: ""
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleDropdownStates = this.handleDropdownStates.bind(this);
    this.updateReport = this.updateReport.bind(this);
    this.removeReport = this.removeReport.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleDescriptionFilter = this.handleDescriptionFilter.bind(this);
    this.stateFilter = this.stateFilter.bind(this);
    this.typeReportFilter = this.typeReportFilter.bind(this);
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

    axios
      .put("/api/reporte", {
        id: currentElement
          .querySelector(".admin__update-dropdown")
          .getAttribute("id"),
        state: event.target.textContent
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

  removeReport(event) {
    const currentReport = event.target
      .closest(".table-reports__delete")
      .getAttribute("id");

    axios
      .delete("/api/reporte", { params: { id: currentReport } })
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

  handleDescriptionFilter(e) {
    this.setState({
      descriptionFilter: e.target.value
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

  handleFilter(e) {
    e.preventDefault();

    this.setState({
      // reportsFiltered: this.state.reports,
      reports: this.state.reports.filter(report => {
        const stateFiltered = report.state === this.state.stateFilter;
        const typeReportFiltered = report.type === this.state.typeReportFilter;
        const descriptionFiltered = report.description.includes(
          this.state.descriptionFilter
        );
        
        if (stateFiltered) {
          return report;
        }

        if (typeReportFiltered) {
          return report;
        }

        if (descriptionFiltered) {
          return report;
        }
      })
    });
  }

  render() {
    return (
      <Fragment>
        <h1 className="heading text-center">Administración Reportes</h1>
        <div className="admin__search">
          <form onSubmit={this.handleFilter}>
            <input
              type="text"
              placeholder="Buscar descripción del reporte"
              onChange={this.handleDescriptionFilter}
              value={this.state.descriptionFilter}
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

                <ul className="admin__update-dropdown" id={report._id}>
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
                id={report._id}
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
