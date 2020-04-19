import React from "react";

import classes from "./Input.module.css";

const input = ({ label, inputType, ...props }) => {
  let inputEl = null;
  switch (inputType) {
    case "input":
      inputEl = <input className={classes.InputElement} {...props} />;
      break;
    case "textarea":
      inputEl = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      inputEl = <input className={classes.InputElement} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputEl}
    </div>
  );
};

export default input;
