import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.authData.idToken,
    userId: action.authData.localId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loading: false,
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
