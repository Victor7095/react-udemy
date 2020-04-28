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
      .post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYQNOYhEG41b211sOIDHWrrI30jwRsQ4c", user)
      .then((res) => {
        dispatch(authSuccess());
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
