import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions";

export function* initIngredientsSaga(action) {
  try {
    const { data } = yield axios.get("/ingredientsData.json");
    yield put(actions.setIngredients(data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed());
  }
}
