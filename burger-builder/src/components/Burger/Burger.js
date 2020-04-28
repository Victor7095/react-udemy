import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = ({ ingredients, small = false }) => {
  let transformedIngredients = ingredients.map((ingredient, i) => {
    return (
      <BurgerIngredient
        key={ingredient + i}
        type={ingredient}
        small={small}
      ></BurgerIngredient>
    );
  });
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding in some ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient small={small} type="bread-top"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient small={small} type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;
