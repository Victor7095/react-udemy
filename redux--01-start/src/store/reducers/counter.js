import * as actionTypes from "../actions";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  const actions = {
    [actionTypes.INCREMENT]: () => ({
      ...state,
      counter: ++state.counter,
    }),
    [actionTypes.DECREMENT]: () => ({
      ...state,
      counter: --state.counter,
    }),
    [actionTypes.ADD]: () => ({
      ...state,
      counter: state.counter + payload.value,
    }),
    [actionTypes.SUBTRACT]: () => ({
      ...state,
      counter: state.counter - payload.value,
    }),
  };
  if (actions[type]) return actions[type]();
  return state;
};

export default reducer;
