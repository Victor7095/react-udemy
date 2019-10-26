import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [{ name: "Yan", age: 18 }, { name: "Ygor", age: 12 }],
      showPersons: false
    };
  }

  switchNameHandler = newName => {
    this.setState({
      persons: [{ name: newName, age: 19 }, { name: "Ygor", age: 12 }]
    });
  };

  nameNameHandler = event => {
    this.setState({
      persons: [
        { name: event.target.value, age: 19 },
        { name: "Ygor", age: 12 }
      ]
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
          <Person
            name={persons[0].name}
            age={persons[0].age}
            click={this.switchNameHandler.bind(this, "Max")}
            changed={this.nameNameHandler}
          >
            I L0ve Vue.js !
          </Person>
          <Person name={persons[1].name} age={persons[1].age}>
            I L0ve Vue.js !
          </Person>
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
