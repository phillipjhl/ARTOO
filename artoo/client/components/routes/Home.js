import React, { Component } from "react";
import LineGraph from "../LineGraph";


export default class Home extends Component {
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
                let results = json.results;
                this.setState({
                    sensorData: {
                        temp: results.filter((a, b) => a.name == "temperature"),
                        humidity: results.filter((a, b) => a.name == "humidity"),
                    },
                });
            });
    }

    render() {

        return (
            <div className="card-columns p-2" >
                {/* <div className="col-sm-4"> */}
                    <div className="card">
                        <div className="card-header">
                            <h4>Temperature</h4>
                        </div>
                        <div className="card-body">
                            <LineGraph
                                type="Temperature"
                                height={350}
                                data={this.state.sensorData.temp}
                            />
                        </div>
                    </div>
                {/* </div> */}
                {/* <div className="col-sm-4"> */}
                    <div className="card">
                        <div className="card-header">
                            <h4>Humidity</h4>
                        </div>
                        <div className="card-body">
                            <LineGraph
                                type="Humidity"
                                height={350}
                                data={this.state.sensorData.humidity}
                            />
                        </div>
                    </div>
                {/* </div> */}
            </div>
        )
    }
}