import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import classes from "./BurgerIngredient.module.css";

const burgerIngredient = ({
  in: inProp,
  type,
  small = false,
  clicked = null,
  readonly = false,
}) => {
  let ingredientControlClasses = [classes.IngredientControl];
  if (!clicked) ingredientControlClasses.push(classes.IngredientControlHidden);

  let ingredientClasses = [];
  if (clicked) ingredientClasses.push(classes.IngredientClickable);
  if (small) ingredientClasses.push(classes.small);

  const ingredientChoices = {
    "bread-bottom": (
      <div
        title="Bottom Bread"
        className={[...ingredientClasses, classes.BreadBottom].join(" ")}
      ></div>
    ),
    "bread-top": (
      <div
        title="Top Bread"
        className={[...ingredientClasses, classes.BreadTop].join(" ")}
      >
        <div className={[...ingredientClasses, classes.Seeds1].join(" ")}></div>
        <div className={[classes.Seeds2]}></div>
      </div>
    ),
    meat: (
      <div
        title="Meat"
        onClick={clicked}
        className={[...ingredientClasses, classes.Meat].join(" ")}
      ></div>
    ),
    cheese: (
      <div
        title="Cheese"
        onClick={clicked}
        className={[...ingredientClasses, classes.Cheese].join(" ")}
      ></div>
    ),
    bacon: (
      <div
        title="Bacon"
        onClick={clicked}
        className={[...ingredientClasses, classes.Bacon].join(" ")}
      ></div>
    ),
    salad: (
      <div
        title="Salad"
        onClick={clicked}
        className={[...ingredientClasses, classes.Salad].join(" ")}
      ></div>
    ),
  };

  const burgerWrapper = (
    <div className={classes.BurgerIngredientWrapper}>
      {ingredientChoices[type]}
      <div className={ingredientControlClasses.join(" ")}>
        <button onClick={clicked}>-</button>
      </div>
    </div>
  );

  return !readonly && clicked ? (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={inProp}
      classNames="slide"
      timeout={600}
    >
      {burgerWrapper}
    </CSSTransition>
  ) : !readonly ? (
    burgerWrapper
  ) : (
    <div className={classes.BurgerIngredientWrapper}>
      {ingredientChoices[type]}
    </div>
  );
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
