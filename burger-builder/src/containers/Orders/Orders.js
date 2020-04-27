import React, { Component } from "react";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    loading: false,
    orders: [],
  };

  componentDidMount() {
    this.setState({loading: true});
    axios
      .get("/orders.json")
      .then((res) => {
        const orders = Object.keys(res.data).map((key) => {
          return { id: key, ...res.data[key] };
        });
        this.setState({ orders });
        this.setState({loading: false});
      })
      .catch((err) => {
        this.setState({loading: false});
      });
  }

  render() {
    const ordersEl = this.state.orders.map(({id, ingredients, price}) => (
      <Order
        key={id}
        ingredients={ingredients}
        price={price}
      />
    ));
    return <div>{ordersEl}</div>;
  }
}

export default withErrorHandler(Orders, axios);
