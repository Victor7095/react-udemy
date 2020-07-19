import React, { useEffect } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/";

import classes from "./Orders.module.css";

const Orders = ({ onFetchOrders, token, userId, loading, orders }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let ordersEl = <Spinner />;
  if (!loading) {
    ordersEl = orders.map(({ id, ingredients, price }) => (
      <Order key={id} ingredients={ingredients} price={price} />
    ));
  }
  return <div className={classes.Orders}>{ordersEl}</div>;
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapActionsToProps = (dispatch) => ({
  onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withErrorHandler(Orders, axios));
