import React, { Component } from "react";
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
} from "../../store/actions/";

import classes from "./BurgerBuilder.module.css";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  addIngredientHandler = (type) => {
    this.props.onIngredientAdded(type);
  };

  removeIngredientHandler = (type) => {
    this.props.onIngredientRemoved(type);
  };

  removeIngredientByIndexHandler = (index) => {
    this.props.onIngredientRemovedByIndex(index);
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const { purchasing } = this.state;

    const {
      ingredients,
      ingredientsQuantity,
      totalPrice,
      error,
      isAuthenticated,
    } = this.props;

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
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );

    let burger = error ? <p>Ingredients can't not be loaded!</p> : <Spinner />;
    if (ingredients) {
      const purchasable = ingredients.length > 0;
      burger = (
        <Aux>
          <Burger
            ingredients={ingredients}
            onIngredientClickHandler={this.removeIngredientByIndexHandler}
          />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={purchasable}
            ordered={this.purchaseHandler}
            price={totalPrice}
            isAuthenticated={isAuthenticated}
          />
        </Aux>
      );
    }

    return (
      <div className={classes.BurgerBuilder}>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

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
  onIngredientRemovedByIndex: (igName) => dispatch(removeIngredientByIndex(igName)),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit()),
  onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withErrorHandler(BurgerBuilder, axios));
