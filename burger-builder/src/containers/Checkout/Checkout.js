import React from "react";
import { Route } from "react-router-dom";
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

  const { ingredients = [] } = props;
  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route path={props.match.url + "/contact-data"} component={ContactData} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
});

export default connect(mapStateToProps)(checkout);
