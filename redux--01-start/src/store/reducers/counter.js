import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  const actions = {
    [actionTypes.INCREMENT]: () =>
      updateObject(state, {
        counter: state.counter + 1,
      }),
    [actionTypes.DECREMENT]: () =>
      updateObject(state, {
        counter: state.counter - 1,
      }),
    [actionTypes.ADD]: () =>
      updateObject(state, {
        counter: state.counter + payload.value,
      }),
    [actionTypes.SUBTRACT]: () =>
      updateObject(state, {
        counter: state.counter - payload.value,
      }),
  };
  if (actions[type]) return actions[type]();
  return state;
};

export default reducer;
