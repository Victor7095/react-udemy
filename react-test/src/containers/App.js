import React, { Component } from "react";
import classes from "./App.css";
import Cockpit from "../components/Cockpit/Cockpit";
import Persons from "../components/Persons/Persons";
import Aux from "../hoc/Aux";
import withClass from "../hoc/withClass";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
    this.state = {
      persons: [
        { id: 1, name: "Yan", age: 18 },
        { id: 2, name: "Ygor", age: 12 },
        { id: 3, name: "Geralt", age: 9000 }
      ],
      showPersons: false,
      showCockpit: true
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("[App.js] getDerivedStateFromProps", props);
  //   return state;
  // }

  componentWillMount() {
    console.log("[App.js] componentWillMount");
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  shouldComponentUpdate() {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  nameChangedHandler = (id, event) => {
    const index = this.state.persons.findIndex(person => {
      return person.id === id;
    });
    const person = { ...this.state.persons[index] };
    const persons = [...this.state.persons];
    persons[index] = person;
    person.name = event.target.value;
    this.setState({
      persons: persons
    });
  };

  deletePersonHandler = index => {
    const newPersons = [...this.state.persons];
    newPersons.splice(index, 1);
    this.setState({
      persons: newPersons
    });
  };

  tooglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    console.log("[App.js] render");
    const { persons, showPersons, showCockpit } = this.state;

    let personsEl = null;

    if (showPersons) {
      personsEl = (
        <Persons
          persons={persons}
          changed={this.nameChangedHandler}
          clicked={this.deletePersonHandler}
        ></Persons>
      );
    }

    return (
      <Aux classes={classes.App}>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        {showCockpit ? (
          <Cockpit
            showPersons={showPersons}
            personsLength={persons.length}
            clicked={this.tooglePersonsHandler}
          ></Cockpit>
        ) : null}
        {personsEl}
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
