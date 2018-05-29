import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import "../styles/Profile.css";
import defaultImage from "../images/default-photo-profile.png";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      username: "",
      firstName: "",
      lastName: ""
    };

    this.removeReport = this.removeReport.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    axios
      .get("/api/usuario", { params: { username: params.username } })
      .then(response => {
        const data = response.data[0];

        this.setState({
          reports: data.reports,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName
        });
      })
      .catch(error => console.log(error));
  }

  removeReport(event) {
    const currentReport = event.target
      .closest(".table-reports__delete")
      .getAttribute("id");

    axios
      .delete(`/api/reporte`, { params: { id: currentReport } })
      .then(response => {
        axios
          .get("/api/reportes")
          .then(response =>
            this.setState({
              reports: response.data
            })
          )
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  render() {
    const { params } = this.props.match;

    console.log(this.props);

    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - {params.username}</title>
        </Helmet>
        <h1 className="heading text-center">Mi perfil</h1>
        <img src={defaultImage} className="profile__img" alt="Foto de perfil" />

        <div className="profile__info margin-bottom-50">
          <h3 className="text-center profile__title">{params.username}</h3>
          <h3 className="text-center profile__title">
            {`${this.state.firstName} ${
              this.state.lastName === undefined ? "" : this.state.lastName
            }`}
          </h3>
        </div>

        <section className="table-reports min-height-40">
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
              {report.state === "Pendiente" && (
                <span
                  className="table-reports__delete"
                  onClick={this.removeReport}
                  id={report._id}
                >
                  <i className="icon-delete-icon" />
                  Eliminar
                </span>
              )}
            </article>
          ))}
        </section>
      </Fragment>
    );
  }
}
