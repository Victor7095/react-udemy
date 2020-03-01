import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = ({label, added}) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}> {label} </div>
            <button className={classes.Less}>Less</button>
            <button onClick={added} className={classes.More}>More</button>
        </div>
    );
};

export default buildControl;