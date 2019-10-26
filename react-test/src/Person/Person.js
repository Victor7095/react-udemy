import React from "react";
import "./Person.css";

const person = props => {
  const { name, age, children, click, changed } = props;
  return (
    <div className="Person">
      <p onClick={click}>
        I am {name} and I am {age} years old
      </p>
      <p>{children}</p>
      <input type="text" onChange={changed} value={props.name} />
    </div>
  );
};

export default person;
