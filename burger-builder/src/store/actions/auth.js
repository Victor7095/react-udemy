import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (authData) => {
  return { type: actionTypes.AUTH_SUCCESS, authData };
};

export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error };
};

export const auth = (user, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYQNOYhEG41b211sOIDHWrrI30jwRsQ4c";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYQNOYhEG41b211sOIDHWrrI30jwRsQ4c";
    }
    axios
      .post(url, user)
      .then((res) => {
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};
