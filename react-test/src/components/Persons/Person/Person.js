import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import classes from "./Person.css";

class Person extends Component {
  render() {
    console.log("[Person.js] rendering...");
    const { name, age, children, click, changed } = this.props;
    return (
      <Aux>
        <p onClick={click}>
          I am {name} and I am {age} years old
        </p>
        <p>{children}</p>
        <input type="text" onChange={changed} value={name} />
      </Aux>
    );
  }
}

export default Person;
