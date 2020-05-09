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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
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
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return { type: actionTypes.SET_AUTH_REDIRECT_PATH, path };
};

export const authCheckState = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("token");
    const localId = localStorage.getItem("userId");

    if (!idToken) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate")).getTime() / 1000;
      const now = new Date().getTime() / 1000;
      if (now < expirationDate) {
        dispatch(authSuccess({ idToken, localId }));
        dispatch(checkAuthTimeout(expirationDate - now));
      } else {
        dispatch(logout());
      }
    }
  };
};
