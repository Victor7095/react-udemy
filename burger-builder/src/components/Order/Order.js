import React from "react";

import classes from "./Order.module.css";

const order = ({ ingredients, price }) => (
  <div className={classes.Order}>
    <p>Ingredients: {ingredients.join(", ")}</p>
    <p className={classes.price}>
      {Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price)}
    </p>
  </div>
);

export default order;
