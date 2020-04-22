import React, { Component } from "react";
import { connect } from "react-redux";

import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";

class Persons extends Component {
  render() {
    return (
      <div>
        <AddPerson personAdded={this.props.onAddPerson} />
        {this.props.persons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onDeletePerson(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { persons: state.persons };
};

const mapActionsToProps = (dispatch) => {
  return {
    onAddPerson: (newPerson) =>
      dispatch({ type: "ADD_PERSON", payload: { newPerson } }),
    onDeletePerson: (id) =>
      dispatch({ type: "DELETE_PERSON", payload: { id } }),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Persons);
