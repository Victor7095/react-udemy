import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.6,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: [],
    ingredientsQuantity: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(ingredients) {
    this.setState({ purchasable: ingredients.length > 0 });
  }

  addIngredientHandler = (type) => {
    const newIngredients = [...this.state.ingredients];
    newIngredients.push(type);

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];

    const ingredientsQuantity = { ...this.state.ingredientsQuantity };
    ingredientsQuantity[type]++;

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
      ingredientsQuantity,
    });
    this.updatePurchaseState(newIngredients);
  };

  removeIngredientHandler = (type) => {
    const ingredientsQuantity = { ...this.state.ingredientsQuantity };
    if (ingredientsQuantity[type] > 0) {
      const newIngredients = [...this.state.ingredients];
      const igIndex = newIngredients.lastIndexOf(type);
      newIngredients.splice(igIndex, 1);

      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - INGREDIENT_PRICES[type];

      ingredientsQuantity[type]--;

      this.setState({
        ingredients: newIngredients,
        totalPrice: newPrice,
        ingredientsQuantity,
      });
      this.updatePurchaseState(newIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredientsQuantity,
      price: this.state.totalPrice,
      customer: {
        name: "Victor Yan",
        address: {
          street: "Av. Torquato Tapajós",
          zipCode: "69093-415",
          country: "Brasil",
        },
        email: "victoryan345@gmail.com",
        deliveryMethod: "fastest",
      },
    };
    axios
      .post("/orders", order)
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const {
      ingredients,
      ingredientsQuantity,
      purchasing,
      purchasable,
      totalPrice,
      loading,
    } = this.state;

    const disabledInfo = {
      ...ingredientsQuantity,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={ingredientsQuantity}
        price={totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );
    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={purchasable}
          ordered={this.purchaseHandler}
          price={totalPrice}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
