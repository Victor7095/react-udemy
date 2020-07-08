import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = ({
  ingredients,
  readonly = false,
  small = false,
  onIngredientClickHandler,
}) => {
  let transformedIngredients = ingredients.map((ingredient, i) => {
    return (
      <BurgerIngredient
        key={ingredient + i}
        type={ingredient}
        small={small}
        readonly={readonly}
        clicked={onIngredientClickHandler ? () => onIngredientClickHandler(i) : null}
      ></BurgerIngredient>
    );
  });
  if (transformedIngredients.length === 0) {
    transformedIngredients = (
      <p className={classes.EmptyBurger}>
        Please start adding in some ingredients!
      </p>
    );
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient
        readonly={readonly}
        small={small}
        type="bread-top"
      ></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient
        readonly={readonly}
        small={small}
        type="bread-bottom"
      ></BurgerIngredient>
    </div>
  );
};

export default burger;
