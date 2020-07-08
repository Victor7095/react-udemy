import React from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/AuxWrapper/AuxWrapper";
import classes from "./BurgerIngredient.module.css";

const burgerIngredient = ({ type, small = false, clicked = null }) => {

  let ingredientControlClasses = [classes.IngredientControl]; 
  if (!clicked) ingredientControlClasses.push(classes.IngredientControlHidden);

  const ingredientClasses = small ? [classes.small, classes.BurgerIngredient] : [classes.BurgerIngredient];

  const ingredientChoices = {
    "bread-bottom": (
      <div
        className={[...ingredientClasses, classes.BreadBottom].join(" ")}
      ></div>
    ),
    "bread-top": (
      <div className={[...ingredientClasses, classes.BreadTop].join(" ")}>
        <div className={[...ingredientClasses, classes.Seeds1].join(" ")}></div>
        <div className={[classes.Seeds2]}></div>
      </div>
    ),
    meat: (
      <div
        onClick={clicked}
        className={[...ingredientClasses, classes.Meat].join(" ")}
      ></div>
    ),
    cheese: (
      <div
        onClick={clicked}
        className={[...ingredientClasses, classes.Cheese].join(" ")}
      ></div>
    ),
    bacon: (
      <div
        onClick={clicked}
        className={[...ingredientClasses, classes.Bacon].join(" ")}
      ></div>
    ),
    salad: (
      <div
        onClick={clicked}
        className={[...ingredientClasses, classes.Salad].join(" ")}
      ></div>
    ),
  };

  return (
    <Aux>
      <div className={ingredientControlClasses.join(" ")}>
        <button onClick={clicked}>-</button>
      </div>
      {ingredientChoices[type]}
    </Aux>
  );
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
