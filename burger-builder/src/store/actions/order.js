import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return { type: actionTypes.PURCHASE_BURGER_SUCCESS, orderId: id, orderData };
};

export const purchaseBurgerFail = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = (orderData) => {
  return (dispacth) => {
    dispacth(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        dispacth(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispacth(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

export const fetchOrdersSuccess = (orders) => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders };
};

export const fetchOrdersFail = (error) => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED, error };
};

export const fetchOrders = () => {
  return (dispacth) => {
    dispacth(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then((res) => {
        const orders = Object.keys(res.data).map((key) => {
          return { id: key, ...res.data[key] };
        });
        dispacth(fetchOrdersSuccess(orders));
      })
      .catch((err) => {
        dispacth(fetchOrdersFail(err));
      });
  };
};
