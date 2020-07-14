import React from "react";
import { TransitionGroup } from "react-transition-group";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = ({
  ingredients,
  readonly = false,
  small = false,
  onIngredientClickHandler,
}) => {
  let transformedIngredients = (
    <TransitionGroup>
      {ingredients.map((ingredient, i) => (
        <BurgerIngredient
          key={ingredient.id}
          type={ingredient.name}
          small={small}
          readonly={readonly}
          clicked={
            onIngredientClickHandler && (() => onIngredientClickHandler(i))
          }
        ></BurgerIngredient>
      ))}
    </TransitionGroup>
  );
  if (ingredients.length === 0) {
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
