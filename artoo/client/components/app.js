import React, { Component } from "react";
import LineGraph from "./LineGraph";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorData: {},
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch("/api/sensors/dht22", {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        this.setState({ sensorData: json });
      });
  }

  render() {
    console.log("state", this.state);

    return (
      <div className="100-vh container-fluid">
        <div className="row">
          <div className="col-6">
            <LineGraph data={this.state.sensorData} />
          </div>
        </div>
      </div>
    );
  }
}
