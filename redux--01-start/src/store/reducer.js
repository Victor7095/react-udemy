const initialState = {
  counter: 0,
  results: [],
};

const reducer = (state = initialState, { type, payload }) => {
  console.log(payload);
  const actions = {
    INCREMENT: () => ({
      ...state,
      counter: ++state.counter,
    }),
    DECREMENT: () => ({
      ...state,
      counter: --state.counter,
    }),
    ADD: () => ({
      ...state,
      counter: state.counter + payload.value,
    }),
    SUBTRACT: () => ({
      ...state,
      counter: state.counter - payload.value,
    }),
    STORE_RESULT: () => ({
      ...state,
      results: [...state.results, state.counter],
    }),
    DELETE_RESULT: () => {
      return {
        ...state,
        results: [...state.results.filter((val,index) => index !== payload.index)]
      };
    },
  };
  if (actions[type]) return actions[type]();
  return state;
};

export default reducer;
