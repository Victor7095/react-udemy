import React from "react";

import classes from "./Cockpit.css";

const cockpit = props => {
  const { showPersons, persons, clicked } = props;

  let assignedClasses = [""];
  const btnClass = [classes.Button];
  if (showPersons) btnClass.push(classes.Red);
  if (persons.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if (persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>My React App</h1>
      <p className={assignedClasses.join(" ")}>A test paragraph</p>
      <button className={btnClass.join(" ")} type="button" onClick={clicked}>
        Toogle Persons
      </button>
    </div>
  );
};

export default cockpit;
