import React, { useEffect, useRef } from "react";

import classes from "./Cockpit.css";
import AuthContext from "../../context/auth-context";

const Cockpit = props => {
  const { showPersons, personsLength, clicked } = props;

  const toggleBtnRef = useRef(null);

  useEffect(() => {
    console.log("[Cockpit.js] useEffect");
    // const timer = setTimeout(() => {
    //   alert("Hi");
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      //clearTimeout(timer);
      console.log("[Cockpit.js] cleanup work in useEffect");
    };
  }, []);

  let assignedClasses = [""];
  const btnClass = [classes.Button];
  if (showPersons) btnClass.push(classes.Red);
  if (personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>My React App</h1>
      <p className={assignedClasses.join(" ")}>A test paragraph</p>
      <button
        className={btnClass.join(" ")}
        type="button"
        onClick={clicked}
        ref={toggleBtnRef}
      >
        Toogle Persons
      </button>
      <AuthContext.Consumer>
        {context => <button onClick={context.login}>Log in</button>}
      </AuthContext.Consumer>
    </div>
  );
};

export default React.memo(Cockpit);
