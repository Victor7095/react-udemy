import * as actionTypes from "./actions";

const initialState = {
  persons: [],
};

const reducer = (state = initialState, { type, payload }) => {
  const actions = {
    [actionTypes.ADD_PERSON]: () => {
      const newPerson = {
        id: Math.random(), // not really unique but good enough here!
        name: "Max",
        age: Math.floor(Math.random() * 40),
      };
      return {
        ...state,
        persons: [...state.persons, newPerson],
      };
    },
    [actionTypes.DELETE_PERSON]: () => ({
      ...state,
      persons: [...state.persons.filter((person) => person.id !== payload.id)],
    }),
  };
  if (actions[type]) return actions[type]();
  return state;
};

export default reducer;
