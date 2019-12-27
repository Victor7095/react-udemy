import React, { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons.js] getDerivedStateFromProps");
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons.js] shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("[Persons.js] componentDidUpdate");
  }

  render() {
    const { persons, clicked, changed } = this.props;
    console.log("[Persons.js] rendering...");
    return persons.map((person, index) => {
      return (
        <Person
          name={person.name}
          age={person.age}
          changed={changed.bind(null, person.id)}
          click={clicked.bind(this, index)}
          key={index}
        >
          I L0ve Vue.js !
        </Person>
      );
    });
  }
}
export default Persons;
