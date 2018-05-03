import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import "../styles/Form.css";
import "../styles/Report.css";

export class Report extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.animationTypeReport = this.animationTypeReport.bind(this);

    this.state = {
      pointLat: 6.249451,
      pointLng: -75.576035
    };
  }

  handleClick(mapProps, map, clickEvent) {
    this.setState({
      pointLat: clickEvent.latLng.lat(),
      pointLng: clickEvent.latLng.lng()
    });
  }

  animationTypeReport(event) {
    const classTypeReport = document.querySelectorAll(
      ".form-report__types-box"
    );
    let currentTypeReport = event.target.closest(".form-report__types-box");

    classTypeReport.forEach(elem => elem.classList.remove("scale-up"));

    currentTypeReport.classList.add("scale-up");
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - Crear reporte</title>
        </Helmet>
        <h1 className="heading text-center">Crear reporte</h1>

        <form className="form-report">
          <input type="text" placeholder="Dirección del reporte" />
          <textarea placeholder="Descripción del reporte" cols="25" rows="10" />
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
              lat: this.state.pointLat,
              lng: this.state.pointLng
            }}
            className="createReportMap"
            onClick={this.handleClick}
          >
            <Marker
              position={{ lat: this.state.pointLat, lng: this.state.pointLng }}
              icon={{
                url:
                  "https://raw.githubusercontent.com/mateoolarte/ecoactua/rails/public/point-map.png"
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
