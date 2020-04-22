import * as actionTypes from "../actions/actions";

const initialState = {
  results: [],
};

const reducer = (state = initialState, { result, type, payload }) => {
  const actions = {
    [actionTypes.STORE_RESULT]: () => ({
      ...state,
      results: [...state.results, result],
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
