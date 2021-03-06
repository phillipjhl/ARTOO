import React, { Component } from "react";
import LineGraph from "../LineGraph";
import { getAuth, refreshToken, resetAuth } from "../../services/auth";
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
            },
            authToken: getAuth()
        };

        this.getData = this.getData.bind(this);
        this.timeoutData = this.timeoutData.bind(this);
    }

    componentDidMount() {
        let auth_token = this.state.authToken;
        this.getData(auth_token);

        this.timeoutData();
    }

    componentWillUnmount() {
        clearInterval(this.timeoutData)
    }

    timeoutData() {
        setInterval(this.getData, 180000);
    };

    getData(token) {
        let auth = token || this.state.authToken;
        fetch("/api/sensors/data/?sensorId=1", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${auth}`
            },
            method: "GET",
        })
            .then(async (resp) => {
                let accessToken;
                switch (resp.status) {
                    case 401 || 403:
                        resetAuth();
                        // refresh token
                        try {
                            accessToken = await refreshToken();
                            this.getData(accessToken);
                        } catch (error) {
                            throw error
                        }
                    default:
                        return resp.json();
                }
            })
            .then((json) => {
                // console.log(json);
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
            })
            .catch(error => console.error(error));
    }

    render() {
        let now = DT.local();
        let nowInMillis = now.toMillis();
        let past = now.minus({ hours: 2 }).toMillis()

        let xDomain = [past, nowInMillis];

        return (
            <div className="row row-cols-1 row-cols-md-3" >

                <div className="col my-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Temperature</h4>
                            <LineGraph
                                type="Temperature"
                                height={350}
                                xDomain={xDomain}
                                yDomain={[64, 76]}
                                data={this.state.sensorData.temp}
                                unit={"\xB0F"}
                                formatY={(temp) => cToF(temp)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col my-4 ">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Humidity</h4>
                            <LineGraph
                                type="Humidity"
                                height={350}
                                xDomain={xDomain}
                                yDomain={[30, 70]}
                                data={this.state.sensorData.humidity}
                                unit={"%"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}