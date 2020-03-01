import React from "react";
import classes from "./BuildControl.css";

const buildControl = ({label}) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}> {label} </div>
            <button className={classes.Less}>>Less</button>
            <button className={classes.More}>>More</button>
        </div>
    );
};

export default buildControl;