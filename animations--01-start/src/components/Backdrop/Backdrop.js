import React from "react";

import "./Backdrop.css";

const backdrop = ({show}) => {
  const classes = ["Backdrop", show ? "BackdropOpen" : "BackdropClosed"]
  return <div className={classes.join(" ")}></div>;
};

export default backdrop;
