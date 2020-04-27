import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/"

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner/>;
    if (!this.props.loading) {
      orders = this.props.orders.map(({id, ingredients, price}) => (
        <Order
          key={id}
          ingredients={ingredients}
          price={price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapActionsToProps = dispatch => ({
  onFetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(Orders, axios));
