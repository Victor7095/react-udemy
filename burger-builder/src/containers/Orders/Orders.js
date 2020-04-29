import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/";

import classes from "./Orders.module.css";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(({ id, ingredients, price }) => (
        <Order key={id} ingredients={ingredients} price={price} />
      ));
    }
    return <div className={classes.Orders}>{orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
});

const mapActionsToProps = (dispatch) => ({
  onFetchOrders: (token) => dispatch(fetchOrders(token)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withErrorHandler(Orders, axios));
