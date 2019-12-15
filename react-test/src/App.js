import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { id: 1, name: "Yan", age: 18 },
        { id: 2, name: "Ygor", age: 12 }
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

    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

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

    return (
      <div className="App">
        <h1>Hello World</h1>
        <button style={style} type="button" onClick={this.tooglePersonsHandler}>
          Toogle Persons
        </button>
        {personsEl}
      </div>
    );
  }
}

export default App;
