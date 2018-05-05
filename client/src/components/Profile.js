import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import "../styles/Profile.css";
import defaultImage from "../images/default-photo-profile.png";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: []
    };
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

  render() {
    const { params } = this.props.match;
    return (
      <Fragment>
        <Helmet>
          <title>Ecoactua - {params.username}</title>
        </Helmet>
        <h1 className="heading text-center">Mi perfil</h1>
        <img src={defaultImage} className="profile__img" alt="Foto de perfil" />

        <div className="profile__info margin-bottom-50">
          <h3 className="text-center profile__title">{params.username}</h3>
          <h3 className="text-center profile__title">Mateo Olarte</h3>
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
                <a href="/" className="table-reports__delete">
                  <i className="icon icon-delete-icon" />
                  Eliminar
                </a>
              )}
            </article>
          ))}
        </section>
      </Fragment>
    );
  }
}
