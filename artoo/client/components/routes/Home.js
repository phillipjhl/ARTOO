import React, { Component } from "react";
import LineGraph from "../LineGraph";
import { getAuth } from "../auth";
import Card from "../Card";
import { DateTime as DT } from "luxon";
import { cToF } from "../utils"


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sensorData: {
                temp: [],
                humidity: []
            }
        };

        this.getData = this.getData.bind(this);
        this.timeoutData = this.timeoutData.bind(this);
    }

    componentDidMount() {
        let auth_token = getAuth();
        this.getData(auth_token);

        this.timeoutData();
    }

    componentWillUnmount() {
        clearInterval(this.timeoutData)
    }

    timeoutData() {
        setInterval(this.getData(), 180000);
    };

    getData(token) {
        fetch("/api/sensors/data/?sensorId=1", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            method: "GET",
        })
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                let results = json.results;
                if (results) {
                    // old way
                    this.setState({
                        sensorData: {
                            temp: results.filter((a, b) => a.name == "temperature"),
                            humidity: results.filter((a, b) => a.name == "humidity"),
                        },
                    });
                }
            });
    }

    render() {

        return (
            <div className="card-columns p-2" >

                <Card title={"Hello there, old friend."}>
                    <div>Test</div>
                </Card>

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Temperature</h4>
                        <LineGraph
                            type="Temperature"
                            height={350}
                            xDomain={[DT.local().minus({ minutes: 45 }).toMillis(), DT.local().toMillis()]}
                            yDomain={[20, 30]}
                            data={this.state.sensorData.temp}
                            unit={"\xB0C"}
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Humidity</h4>
                        <LineGraph
                            type="Humidity"
                            height={350}
                            xDomain={[DT.local().minus({ minutes: 45 }).toMillis(), DT.local().toMillis()]}
                            yDomain={[30, 70]}
                            data={this.state.sensorData.humidity}
                            unit={"%"}
                        />
                    </div>
                </div>

                <Card title={"Hello there, old friend."}>
                    <div style={{ height: "300px" }}>Test</div>
                </Card>
            </div>
        )
    }
}