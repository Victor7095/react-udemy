import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = ({ label, added, removed, disabled }) => {
  return (
    <div className={classes.BuildControl}>
      <button
        title="Less"
        onClick={removed}
        className={classes.Less}
        disabled={disabled}
      >
        -
      </button>
      <div className={classes.Label}> {label} </div>
      <button title="More" onClick={added} className={classes.More}>
        +
      </button>
    </div>
  );
};

export default buildControl;
