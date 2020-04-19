import React from "react";

import classes from "./Input.module.css";

const input = ({ label, elType, elConfig, value, onChange }) => {
  let inputEl = null;
  switch (elType) {
    case "input":
      inputEl = (
        <input
          className={classes.InputElement}
          {...elConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={classes.InputElement}
          {...elConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "select":
      const { options, ...config } = elConfig;
      inputEl = (
        <select
          className={classes.InputElement}
          {...config}
          value={value}
          onChange={onChange}
        >
          {options.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={classes.InputElement}
          {...elConfig}
          value={value}
          onChange={onChange}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputEl}
    </div>
  );
};

export default input;
