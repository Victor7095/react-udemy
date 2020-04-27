import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.PURCHASE_INIT]: () => ({ ...state, purchased: false }),
    [actionTypes.PURCHASE_BURGER_START]: () => ({ ...state, loading: true }),
    [actionTypes.PURCHASE_BURGER_SUCCESS]: () => ({
      ...state,
      loading: false,
      orders: state.orders.concat({
        ...action.orderData,
        id: action.orderId,
      }),
      purchased: true,
    }),
    [actionTypes.PURCHASE_BURGER_FAIL]: () => ({ ...state, loading: false }),
  };
  if (actions[action.type]) return actions[action.type]();
  return state;
};

export default reducer;
