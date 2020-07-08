import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const checkoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger readonly ingredients={ingredients}></Burger>
      </div>
      <Button type="Danger" clicked={checkoutCancelled}>
        Cancel
      </Button>
      <Button type="Success" clicked={checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
