import React, { Component } from "react";

import "./AddPerson.css";

class AddPerson extends Component {
  state = {
    name: "",
    age: 0,
  };

  render() {
    return (
      <div className="AddPerson">
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="Age"
          value={this.state.age}
          onChange={(e) => {
            this.setState({ age: e.target.value });
          }}
        />
        <button
          onClick={() =>
            this.props.personAdded({
              name: this.state.name,
              age: this.state.age,
            })
          }
        >
          Add Person
        </button>
      </div>
    );
  }
}

export default AddPerson;
