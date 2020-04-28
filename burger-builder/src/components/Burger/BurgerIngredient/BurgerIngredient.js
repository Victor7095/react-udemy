import React from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIngredient.module.css";

const burgerIngredient = ({ type, small = false }) => {
  const ingredientClasses = small ? [classes.small] : [];

  const ingredientChoices = {
    "bread-bottom": (
      <div className={[...ingredientClasses, classes.BreadBottom].join(" ")}></div>
    ),
    "bread-top": (
      <div className={[...ingredientClasses, classes.BreadTop].join(" ")}>
        <div className={[...ingredientClasses, classes.Seeds1].join(" ")}></div>
        <div className={[classes.Seeds2]}></div>
      </div>
    ),
    meat: <div className={[...ingredientClasses, classes.Meat].join(" ")}></div>,
    cheese: <div className={[...ingredientClasses, classes.Cheese].join(" ")}></div>,
    bacon: <div className={[...ingredientClasses, classes.Bacon].join(" ")}></div>,
    salad: <div className={[...ingredientClasses, classes.Salad].join(" ")}></div>,
  };

  return ingredientChoices[type];
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
