import React, { Component } from "react";
import classes from "./App.css";
import Person from "../components/Persons/Person/Person";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

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

    const btnClass = [classes.Button];

    let personsEl = null;

    if (showPersons) {
      personsEl = (
        <div>
          {persons.map((person, index) => {
            return (
              <ErrorBoundary key={person.id}>
                <Person
                  name={person.name}
                  age={person.age}
                  changed={this.nameChangedHandler.bind(null, person.id)}
                  click={this.deletePersonHandler.bind(this, index)}
                >
                  I L0ve Vue.js !
                </Person>
              </ErrorBoundary>
            );
          })}
        </div>
      );
      btnClass.push(classes.Red);
    }

    let assignedClasses = [""];
    if (persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>My React App</h1>
        <p className={assignedClasses.join(" ")}>A test paragraph</p>
        <button
          className={btnClass.join(" ")}
          type="button"
          onClick={this.tooglePersonsHandler}
        >
          Toogle Persons
        </button>
        {personsEl}
      </div>
    );
  }
}

export default App;
