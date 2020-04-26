import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
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
  initIngredients
} from "../../store/actions/";

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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const { purchasing } = this.state;

    const { ingredients, ingredientsQuantity, totalPrice, error } = this.props;

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

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  ingredientsQuantity: state.ingredientsQuantity,
  totalPrice: state.totalPrice,
  error: state.error
});

const mapActionsToProps = (dispatch) => ({
  onIngredientAdded: (igName) => dispatch(addIngredient(igName)),
  onIngredientRemoved: (igName) => dispatch(removeIngredient(igName)),
  onInitIngredients: () => dispatch(initIngredients()),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withErrorHandler(BurgerBuilder, axios));
