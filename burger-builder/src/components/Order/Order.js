import React from "react";

import Burger from "../Burger/Burger";

import classes from "./Order.module.css";

const order = ({ ingredients, price }) => (
  <div className={classes.Order}>
    <p>Ingredients: {ingredients.map((ig) => ig.name).join(", ")}</p>
    <Burger readonly ingredients={ingredients} small></Burger>
    <p className={classes.price}>
      {Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price)}
    </p>
  </div>
);

export default order;
