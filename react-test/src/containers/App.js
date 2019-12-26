import React, { Component } from "react";
import classes from "./App.css";
import Cockpit from "../components/Cockpit/Cockpit";
import Persons from "../components/Persons/Persons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { id: 1, name: "Yan", age: 18 },
        { id: 2, name: "Ygor", age: 12 },
        { id: 3, name: "Geralt", age: 9000 }
      ],
      showPersons: false
    };
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
    const { persons, showPersons } = this.state;

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
      <div className={classes.App}>
        <Cockpit
          showPersons={showPersons}
          persons={persons}
          clicked={this.tooglePersonsHandler}
        ></Cockpit>
        {personsEl}
      </div>
    );
  }
}

export default App;
