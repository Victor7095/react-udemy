import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "reac-router-dom";

import "./index.css";
import App from "./App";

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("app"));
