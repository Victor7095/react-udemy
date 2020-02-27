import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
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

Person.propTypes = {
  click: PropTypes.func,
  changed: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number
};

export default withClass(Person, classes.Person);
