import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ reports: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/usuarios");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    console.log(this.state.reports);
    return (
      <div className="App">
        <h1>Hi!</h1>
      </div>
    );
  }
}

export default App;
