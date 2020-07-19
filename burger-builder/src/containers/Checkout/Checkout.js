import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const { ingredients, purchased, history, match } = props;

  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace("checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (ingredients) {
    let purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
