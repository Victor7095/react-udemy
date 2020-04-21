const initialState = {
  counter: 0,
};

const reducer = (state = initialState, {type, payload}) => {
  const actions = {
    "INCREMENT": () => ({
      ...state,
      counter: ++state.counter,
    }),
    "DECREMENT": () => ({
      ...state,
      counter: --state.counter,
    }),
    "ADD": () => ({
      ...state,
      counter: state.counter + payload.value,
    }),
    "SUBTRACT": () => ({
      ...state,
      counter: state.counter - payload.value,
    }),
  };
  if(actions[type]) return actions[type]();
  return state;
};

export default reducer;
