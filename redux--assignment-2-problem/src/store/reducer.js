import * as actionTypes from "./actions";

const initialState = {
  persons: [],
};

const reducer = (state = initialState, { type, payload }) => {
  const actions = {
    [actionTypes.ADD_PERSON]: () => {
      payload.newPerson.id = Math.random();
      return {
        ...state,
        persons: [...state.persons, payload.newPerson],
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
