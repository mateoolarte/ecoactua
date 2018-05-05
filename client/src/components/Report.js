import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import qs from 'qs';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import "../styles/Form.css";
import "../styles/Report.css";

export class Report extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.animationTypeReport = this.animationTypeReport.bind(this);

    this.state = {
      address: "",
      description: "",
      pointlat: 6.249451,
      pointlong: -75.576035,
      type: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/reporte", qs.stringify(this.state))
      .then(response => {
        console.log(response);

        const classTypeReport = document.querySelectorAll(
          ".form-report__types-box"
        );
        classTypeReport.forEach(elem => elem.classList.remove("scale-up"));

        this.setState({
          address: "",
          description: "",
          pointlat: 6.249451,
          pointlong: -75.576035,
          type: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAddress(event) {
    this.setState({
      address: event.target.value
    });
  }

  handleDescription(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleClick(mapProps, map, clickEvent) {
    this.setState({
      pointlat: clickEvent.latLng.lat(),
      pointlong: clickEvent.latLng.lng()
    });
  }

  animationTypeReport(event) {
    const classTypeReport = document.querySelectorAll(
      ".form-report__types-box"
    );
    let currentTypeReport = event.target.closest(".form-report__types-box");

    classTypeReport.forEach(elem => elem.classList.remove("scale-up"));
    currentTypeReport.classList.add("scale-up");

    this.setState({
      type: currentTypeReport.textContent
    });
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Crear reporte</title>
        </Helmet>
        <h1 className="heading text-center">Crear reporte</h1>

        <form className="form-report" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Dirección del reporte"
            required
            onChange={this.handleAddress}
            value={this.state.address}
          />
          <textarea
            placeholder="Descripción del reporte"
            cols="25"
            rows="10"
            required
            onChange={this.handleDescription}
            value={this.state.description}
          />
          <label className="margin-15-auto">Tipo de reporte</label>
          <div className="form-report__types">
            <span
              className="form-report__types-box"
              onClick={this.animationTypeReport}
            >
              <span className="form-report__types-icon vegetación-type">
                <i className="icon icon-vegetación-icon" />
              </span>
              <em className="form-report__types-text">Vegetación</em>
            </span>
            <span
              className="form-report__types-box"
              onClick={this.animationTypeReport}
            >
              <span className="form-report__types-icon animal-type">
                <i className="icon icon-animal-icon" />
              </span>
              <em className="form-report__types-text">Animal</em>
            </span>
            <span
              className="form-report__types-box"
              onClick={this.animationTypeReport}
            >
              <span className="form-report__types-icon superficie-type">
                <i className="icon icon-superficie-icon" />
              </span>
              <em className="form-report__types-text">Superficie</em>
            </span>
            <span
              className="form-report__types-box"
              onClick={this.animationTypeReport}
            >
              <span className="form-report__types-icon aire-type">
                <i className="icon icon-aire-icon" />
              </span>
              <em className="form-report__types-text">Aire</em>
            </span>
            <span
              className="form-report__types-box"
              onClick={this.animationTypeReport}
            >
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
            onClick={this.handleClick}
          >
            <Marker
              position={{ lat: this.state.pointlat, lng: this.state.pointlong }}
              icon={{
                url:
                  "favicon.ico"
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
  apiKey: "AIzaSyAD7fBDU_tVmqTL_zqIAVC_317qfyYH7Js",
  LoadingContainer: LoadingContainer
})(Report);
