import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = ({label, added, removed, disabled}) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}> {label} </div>
            <button
                onClick={removed}
                className={classes.Less}
                disabled={disabled}
            > Less
            </button>
            <button
                onClick={added}
                className={classes.More}
            > More
            </button>
        </div>
    );
};

export default buildControl;