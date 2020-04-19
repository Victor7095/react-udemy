import React from "react";

import classes from "./Button.module.css";

const button = ({ disabled, type, clicked, children }) => (
  <button
    disabled={disabled}
    className={[classes.Button, classes[type]].join(" ")}
    onClick={clicked}
  >
    {children}
  </button>
);

export default button;
