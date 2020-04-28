import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  ingredientsQuantity: null,
  totalPrice: 4.0,
  error: false,
};

const authStart = (state, action) => {
  return updateObject(state, {});
};

const authSuccess = (state, action) => {
  return updateObject(state, {});
};

const authFail = (state, action) =>
  updateObject(state, {
    error: true,
  });

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.AUTH_START]: () => authStart(state, action),

    [actionTypes.AUTH_SUCCESS]: () => authSuccess(state, action),

    [actionTypes.AUTH_FAIL]: () => authFail(state, action),
  };

  if (actions[action.type]) return actions[action.type]();
  return state;
};

export default reducer;
