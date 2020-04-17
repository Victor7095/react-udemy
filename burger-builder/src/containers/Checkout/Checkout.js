import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={["salad", "cheese", "bacon"]} />
      </div>
    );
  }
}

export default Checkout;
