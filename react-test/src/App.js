import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

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
        <div>
          {persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                changed={this.nameChangedHandler.bind(null, person.id)}
                click={this.deletePersonHandler.bind(this, index)}
              >
                I L0ve Vue.js !
              </Person>
            );
          })}
        </div>
      );
    }

    let classes = [""];
    if (persons.length <= 2) {
      classes.push("red");
    }
    if (persons.length <= 1) {
      classes.push("bold");
    }

    return (
      <div className="App">
        <h1>My React App</h1>
        <p className={classes.join(" ")}>A test paragraph</p>
        <button
          alt={showPersons}
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
