import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import classes from "./Person.css";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElRef = React.createRef();
  }

  componentDidMount() {
    this.inputElRef.current.focus();
  }

  render() {
    console.log("[Person.js] rendering...");
    const { name, age, children, click, changed } = this.props;
    return (
      <Aux>
        <AuthContext.Consumer>
          {context =>
            context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>
          }
        </AuthContext.Consumer>
        <p onClick={click}>
          I am {name} and I am {age} years old
        </p>
        <p>{children}</p>
        <input
          type="text"
          onChange={changed}
          value={name}
          ref={this.inputElRef}
        />
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
