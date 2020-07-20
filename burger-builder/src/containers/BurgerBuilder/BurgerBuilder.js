import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Aux from "../../hoc/AuxWrapper/AuxWrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import {
  addIngredient,
  removeIngredient,
  removeIngredientByIndex,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath,
} from "../../store/actions";

import classes from "./BurgerBuilder.module.css";
import { useEffect } from "react";
import { useCallback } from "react";

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const ingredientsQuantity = useSelector(
    (state) => state.burgerBuilder.ingredientsQuantity
  );
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token != null);

  const dispatch = useDispatch();

  const onIngredientAdded = (igName) => dispatch(addIngredient(igName));
  const onIngredientRemoved = (igName) => dispatch(removeIngredient(igName));
  const onIngredientRemovedByIndex = (igName) =>
    dispatch(removeIngredientByIndex(igName));
  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [
    dispatch,
  ]);
  const onInitPurchase = () => dispatch(purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const addIngredientHandler = (type) => {
    onIngredientAdded(type);
  };

  const removeIngredientHandler = (type) => {
    onIngredientRemoved(type);
  };

  const removeIngredientByIndexHandler = (index) => {
    onIngredientRemovedByIndex(index);
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ingredientsQuantity,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  if (ingredientsQuantity)
    orderSummary = (
      <OrderSummary
        ingredients={ingredientsQuantity}
        price={totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );

  let burger = error ? <p>Ingredients can't not be loaded!</p> : <Spinner />;
  if (ingredients) {
    const purchasable = ingredients.length > 0;
    burger = (
      <Aux>
        <Burger
          ingredients={ingredients}
          onIngredientClickHandler={removeIngredientByIndexHandler}
        />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={purchasable}
          ordered={purchaseHandler}
          price={totalPrice}
          isAuthenticated={isAuthenticated}
        />
      </Aux>
    );
  }

  return (
    <div className={classes.BurgerBuilder}>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </div>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
