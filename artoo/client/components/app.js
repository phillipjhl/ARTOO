import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import SideNav from "./SideNav";
// import TopNav from "./topnav";

export default class App extends Component {

  render() {
    console.log("state", this.state);

    return (
      <div className="vh-100 container-fluid">
        <Router>
          <>
            <SideNav />
            {/* <TopNav /> */}
            <div className="main h-100">
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </>
        </Router>
      </div>
    );
  }
}
