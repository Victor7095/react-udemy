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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    /*axios
      .get("/ingredientsData.json")
      .then(({ data }) => {
        const { ingredientsOrder = [], ingredientsQuantity } = data;
        const newPrice = this.calculatePrice(ingredientsQuantity);
        this.setState({
          ingredients: ingredientsOrder,
          ingredientsQuantity,
          totalPrice: newPrice,
        });
      })
      .catch((err) => this.setState({ error: true }));
      */
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
    const { purchasing, loading, error } = this.state;

    const { ingredients, ingredientsQuantity, totalPrice } = this.props;

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
    if (loading) {
      orderSummary = <Spinner />;
    }

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
});

const mapActionsToProps = (dispatch) => ({
  onIngredientAdded: (igName) =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, igName }),
  onIngredientRemoved: (igName) =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, igName }),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withErrorHandler(BurgerBuilder, axios));
