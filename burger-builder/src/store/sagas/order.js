import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const res = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );

    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

  try {
    const res = yield axios.get("/orders.json" + queryParams);
    const orders = Object.keys(res.data).map((key) => {
      return { id: key, ...res.data[key] };
    });

    yield put(actions.fetchOrdersSuccess(orders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
