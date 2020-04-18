import React from "react";

import classes from "./Order.module.css";

const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad</p>
    <p>Price: <strong>R$ 4,00</strong></p>
  </div>
);

export default order;
