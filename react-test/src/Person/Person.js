import React from "react";

import classes from "./Person.css";

const person = props => {
  const { name, age, children, click, changed } = props;
  const rnd = Math.random();
  if (rnd > 0.7) throw new Error("Something went wrong");
  return (
    <div className={classes.Person}>
      <p onClick={click}>
        I am {name} and I am {age} years old
      </p>
      <p>{children}</p>
      <input type="text" onChange={changed} value={props.name} />
    </div>
  );
};

export default person;
