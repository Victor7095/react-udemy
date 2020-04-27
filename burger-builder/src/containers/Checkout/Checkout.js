import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  const { ingredients } = props;
  if (ingredients) {
    summary = (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
});

export default connect(mapStateToProps)(checkout);
