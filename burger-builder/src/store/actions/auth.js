import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (authData) => {
  return { type: actionTypes.AUTH_SUCCESS, authData };
};

export const authFail = () => {
  return { type: actionTypes.AUTH_FAIL };
};

export const auth = (user) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/users.json", user)
      .then((res) => {
        dispatch(authSuccess());
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
