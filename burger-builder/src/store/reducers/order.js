import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.PURCHASE_INIT]: () =>
      updateObject(state, { purchased: false }),
    [actionTypes.PURCHASE_BURGER_START]: () =>
      updateObject(state, { loading: true }),
    [actionTypes.PURCHASE_BURGER_SUCCESS]: () =>
      updateObject(state, {
        loading: false,
        orders: state.orders.concat(
          updateObject(action.orderData, {
            id: action.orderId,
          })
        ),
        purchased: true,
      }),
    [actionTypes.PURCHASE_BURGER_FAIL]: () =>
      updateObject(state, { loading: false }),
    [actionTypes.FETCH_ORDERS_START]: () =>
      updateObject(state, { loading: true }),
    [actionTypes.FETCH_ORDERS_SUCCESS]: () =>
      updateObject(state, {
        orders: action.orders,
        loading: false,
      }),
    [actionTypes.FETCH_ORDERS_FAIL]: () =>
      updateObject(state, { loading: false }),
  };
  if (actions[action.type]) return actions[action.type]();
  return state;
};

export default reducer;
