import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) =>
  updateObject(state, { purchased: false });

const purchaseBurgerStart = (state, action) =>
  updateObject(state, { loading: true });

const purchaseBurgerSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    orders: state.orders.concat(
      updateObject(action.orderData, {
        id: action.orderId,
      })
    ),
    purchased: true,
  });

const purchaseBurgerFail = (state, action) =>
  updateObject(state, { loading: false });

const fetchOrdersStart = (state, action) =>
  updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, action) =>
  updateObject(state, {
    orders: action.orders,
    loading: false,
  });

const fetchOrdersFail = (state, action) =>
  updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.PURCHASE_INIT]: () => purchaseInit(state, action),
    [actionTypes.PURCHASE_BURGER_START]: () =>
      purchaseBurgerStart(state, action),
    [actionTypes.PURCHASE_BURGER_SUCCESS]: () =>
      purchaseBurgerSuccess(state, action),
    [actionTypes.PURCHASE_BURGER_FAIL]: () => purchaseBurgerFail(state, action),
    [actionTypes.FETCH_ORDERS_START]: () => fetchOrdersStart(state, action),
    [actionTypes.FETCH_ORDERS_SUCCESS]: () => fetchOrdersSuccess(state, action),
    [actionTypes.FETCH_ORDERS_FAIL]: () => fetchOrdersFail(state, action),
  };
  if (actions[action.type]) return actions[action.type]();
  return state;
};

export default reducer;
