import React from "react";
import Person from "./Person/Person";

const persons = props => {
  const { persons, clicked, changed } = props;
  return persons.map((person, index) => {
    return (
      <Person
        name={person.name}
        age={person.age}
        changed={changed.bind(null, person.id)}
        click={clicked.bind(this, index)}
      >
        I L0ve Vue.js !
      </Person>
    );
  });
};
export default persons;
