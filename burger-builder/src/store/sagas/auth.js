import { put, delay } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYQNOYhEG41b211sOIDHWrrI30jwRsQ4c";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYQNOYhEG41b211sOIDHWrrI30jwRsQ4c";
  }

  try {
    const res = yield axios.post(url, action.user);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("userId", res.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate);

    yield put(actions.authSuccess(res.data));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const idToken = yield localStorage.getItem("token");
  const localId = yield localStorage.getItem("userId");

  if (!idToken) {
    yield put(actions.logout());
  } else {
    const expirationDate =
      new Date(localStorage.getItem("expirationDate")).getTime() / 1000;
    const now = new Date().getTime() / 1000;
    if (now < expirationDate) {
      yield put(actions.authSuccess({ idToken, localId }));
      yield put(actions.checkAuthTimeout(expirationDate - now));
    } else {
      yield put(actions.logout());
    }
  }
}
