import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = ({ ingredients }) => {
  let transformedIngredients = ingredients.map((ingredient, i) => {
    return (
      <BurgerIngredient
        key={ingredient + i}
        type={ingredient}
      ></BurgerIngredient>
    );
  });
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding in some ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;
