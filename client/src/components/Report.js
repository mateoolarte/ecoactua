import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import "../styles/Form.css";
import "../styles/Report.css";

export class Report extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getPointMap = this.getPointMap.bind(this);
    this.getType = this.getType.bind(this);
    this.removeAlert = this.removeAlert.bind(this);

    this.state = {
      address: "",
      description: "",
      pointlat: 6.249451,
      pointlong: -75.576035,
      type: "",
      userId: JSON.parse(localStorage.getItem("currentUser")).id,
      notification: "",
      redirectPage: false
    };
  }

  componentDidUpdate() {
    if (this.state.notification !== "") {
      let alert = document.querySelector(".alert");
      let alertText = document.querySelector(".alertText");
      const text = document.createTextNode(this.state.notification);

      alert.classList.add("alert--active", "alert--danger");
      alertText.innerHTML = "";
      alertText.appendChild(text);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.type === "") {
      this.setState({
        notification: "Debes escoger un tipo de reporte."
      });
    } else if (
      this.state.pointlat === 6.249451 &&
      this.state.pointlong === -75.576035
    ) {
      this.setState({
        notification: "Debes seleccionar un punto en el mapa."
      });
    } else {
      axios({
        url: "/api/reporte",
        method: "post",
        data: qs.stringify(this.state),
        headers: { "x-access-token": localStorage.getItem("tokenUser") }
      })
        .then(response => {
          const classTypeReport = document.querySelectorAll(
            ".form-report__types-box"
          );
          classTypeReport.forEach(elem => elem.classList.remove("scale-up"));

          this.setState({
            address: "",
            description: "",
            pointlat: 6.249451,
            pointlong: -75.576035,
            type: "",
            redirectPage: true
          });
        })
        .catch(err => {
          console.log(err.response.data.notification);
        });
    }
  }

  getAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  getDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  getType(e) {
    const classTypeReport = document.querySelectorAll(
      ".form-report__types-box"
    );
    let currentTypeReport = e.target.closest(".form-report__types-box");

    classTypeReport.forEach(elem => elem.classList.remove("scale-up"));
    currentTypeReport.classList.add("scale-up");

    this.setState({
      type: currentTypeReport.textContent
    });
  }

  getPointMap(mapProps, map, clickEvent) {
    this.setState({
      pointlat: clickEvent.latLng.lat(),
      pointlong: clickEvent.latLng.lng()
    });
  }

  removeAlert(e) {
    const alertContainer = e.target.closest(".alert");
    alertContainer.classList.remove("alert--active");

    this.setState({
      notification: ""
    });
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Crear reporte</title>
        </Helmet>

        {this.state.redirectPage && (
          <Redirect
            to={{
              pathname: "/reportes",
              state: "El reporte se ha creado correctamente."
            }}
          />
        )}

        {this.state.notification !== "" && (
          <div className="alert">
            <p className="alertText" />
            <button
              type="button"
              className="alertBtn"
              onClick={this.removeAlert}
            >
              <i className="icon-delete-icon" />
            </button>
          </div>
        )}
        <h1 className="heading text-center">Crear reporte</h1>

        <form className="form-report" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Dirección del reporte"
            onChange={this.getAddress}
            value={this.state.address}
            required
          />
          <textarea
            placeholder="Descripción del reporte"
            rows="8"
            onChange={this.getDescription}
            value={this.state.description}
            required
          />
          <label className="margin-15-auto">Tipo de reporte</label>
          <div className="form-report__types">
            <span className="form-report__types-box" onClick={this.getType}>
              <span className="form-report__types-icon vegetación-type">
                <i className="icon icon-vegetación-icon" />
              </span>
              <em className="form-report__types-text">Vegetación</em>
            </span>
            <span className="form-report__types-box" onClick={this.getType}>
              <span className="form-report__types-icon animal-type">
                <i className="icon icon-animal-icon" />
              </span>
              <em className="form-report__types-text">Animal</em>
            </span>
            <span className="form-report__types-box" onClick={this.getType}>
              <span className="form-report__types-icon superficie-type">
                <i className="icon icon-superficie-icon" />
              </span>
              <em className="form-report__types-text">Superficie</em>
            </span>
            <span className="form-report__types-box" onClick={this.getType}>
              <span className="form-report__types-icon aire-type">
                <i className="icon icon-aire-icon" />
              </span>
              <em className="form-report__types-text">Aire</em>
            </span>
            <span className="form-report__types-box" onClick={this.getType}>
              <span className="form-report__types-icon agua-type">
                <i className="icon icon-agua-icon" />
              </span>
              <em className="form-report__types-text">Agua</em>
            </span>
          </div>
          <label className="margin-top-30">
            Ubicación en el mapa{" "}
            <span>
              ( Haz clic sobre el mapa para ubicar el lugar del reporte )
            </span>
          </label>
          <Map
            google={this.props.google}
            zoom={13}
            initialCenter={{
              lat: 6.249451,
              lng: -75.576035
            }}
            center={{
              lat: this.state.pointlat,
              lng: this.state.pointlong
            }}
            className="createReportMap"
            onClick={this.getPointMap}
          >
            <Marker
              position={{ lat: this.state.pointlat, lng: this.state.pointlong }}
              icon={{
                url: "favicon.ico"
              }}
            />
          </Map>
          <div className="text-center margin-top-540">
            <input
              type="submit"
              className="btn btn-primary btn-large text-center btn-create-report"
              value="Crea tu reporte"
            />
          </div>
        </form>
      </Fragment>
    );
  }
}

const LoadingContainer = props => <div>Fancy loading container!</div>;

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_GOOGLE_MAPS,
  LoadingContainer: LoadingContainer
})(Report);
