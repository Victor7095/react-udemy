import * as actionTypes from "./actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.6,
};

const initialState = {
  ingredients: [],
  ingredientsQuantity: {},
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;
