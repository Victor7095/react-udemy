import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return { type: actionTypes.PURCHASE_BURGER_SUCCESS, orderId: id, orderData };
};

export const purchaseBurgerFail = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurgerStart = (orderData) => {
  return (dispacth) => {
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        dispacth(purchaseBurgerSuccess(res.data, orderData));
      })
      .catch((err) => {
        dispacth(purchaseBurgerFail(err));
      });
  };
};
