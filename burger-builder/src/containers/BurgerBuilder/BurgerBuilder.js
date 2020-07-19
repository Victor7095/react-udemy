import React, { useState } from "react";
import { connect } from "react-redux";

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

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const {
    ingredients,
    ingredientsQuantity,
    totalPrice,
    error,
    isAuthenticated,
    onInitIngredients,
  } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const addIngredientHandler = (type) => {
    props.onIngredientAdded(type);
  };

  const removeIngredientHandler = (type) => {
    props.onIngredientRemoved(type);
  };

  const removeIngredientByIndexHandler = (index) => {
    props.onIngredientRemovedByIndex(index);
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
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

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  ingredientsQuantity: state.burgerBuilder.ingredientsQuantity,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
});

const mapActionsToProps = (dispatch) => ({
  onIngredientAdded: (igName) => dispatch(addIngredient(igName)),
  onIngredientRemoved: (igName) => dispatch(removeIngredient(igName)),
  onIngredientRemovedByIndex: (igName) =>
    dispatch(removeIngredientByIndex(igName)),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit()),
  onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withErrorHandler(BurgerBuilder, axios));
