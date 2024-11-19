import { v4 as uuid } from "uuid";
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

    action.orderData.ingredients = action.orderData.ingredients.map(
      (igName) => ({
        id: uuid(),
        name: igName,
      })
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
    const orders = yield Object.keys(res.data).map((key) => {
      const ingredients = res.data[key].ingredients.map((igName) => ({
        id: uuid(),
        name: igName,
      }));
      return { id: key, ...res.data[key], ingredients };
    });

    yield put(actions.fetchOrdersSuccess(orders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
