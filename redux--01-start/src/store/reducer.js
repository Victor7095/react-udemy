import * as actionTypes from "./actions";

const initialState = {
  counter: 0,
  results: [],
};

const reducer = (state = initialState, { type, payload }) => {
  console.log(payload);
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
    [actionTypes.STORE_RESULT]: () => ({
      ...state,
      results: [...state.results, state.counter],
    }),
    [actionTypes.DELETE_RESULT]: () => {
      return {
        ...state,
        results: [
          ...state.results.filter((val, index) => index !== payload.index),
        ],
      };
    },
  };
  if (actions[type]) return actions[type]();
  return state;
};

export default reducer;
