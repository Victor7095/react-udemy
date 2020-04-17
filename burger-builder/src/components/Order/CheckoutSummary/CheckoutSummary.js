import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const checkoutSummary = ({ ingredients }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={ingredients}></Burger>
      </div>
      <Button type="Danger" clicked>
        Cancel
      </Button>
      <Button type="Success" clicked>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
