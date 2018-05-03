import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    console.log();
    
    return (
      <h1>Hola mundo {this.props.match.params.username}</h1>
    )
  }
}
