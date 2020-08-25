import React, { Component } from "react";
import LineGraph from "./LineGraph";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorData: {
        temp: [],
        humidity: [],
      },
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    setInterval(this.getData(), 180000);
  }

  getData() {
    fetch("/api/sensors/data/", {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        this.setState({
          sensorData: {
            temp: json.filter((a, b) => a.name == "temperature"),
            humidity: json.filter((a, b) => a.name == "humidity"),
          },
        });
      });
  }

  render() {
    console.log("state", this.state);

    return (
      <div className="100-vh container-fluid">
        <div className="row p-2">
          <div className="card col-5 p-0">
            <div className="card-header">
              <h4>Temperature</h4>
            </div>
            <div className="card-body">
              <LineGraph
                domain={{ y: [20, 30] }}
                data={this.state.sensorData.temp}
              />
            </div>
          </div>
          <div className="card col-5 p-0">
            <div className="card-header">
              <h4>Humidity</h4>
            </div>
            <div className="card-body">
              <LineGraph
                domain={{ y: [45, 75] }}
                data={this.state.sensorData.humidity}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
