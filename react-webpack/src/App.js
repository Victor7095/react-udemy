import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import asyncComponent from "./hoc/asyncComponent";

const asyncUsers = asyncComponent(() => import("./containers/Users"))
const asyncPizza = asyncComponent(() => import("./containers/Pizza"))

class App extends Component {
  render() {
    return (
      <div>
        <h1>aa</h1>
        <div>
          <Link to="/">Users</Link>
          <Link to="/pizza">Pizza</Link>
        </div>
        <div>
          <Route path="/" exact component={asyncUsers} />
          <Route path="/pizza" component={asyncPizza} />
        </div>
      </div>
    );
  }
}

export default App;