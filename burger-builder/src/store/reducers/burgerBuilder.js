import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.6,
};

const calculatePrice = (ingredientsQuantity) => {
  let newPrice = 4;
  const ingredientKeys = Object.keys(ingredientsQuantity);
  ingredientKeys.forEach((key) => {
    newPrice += ingredientsQuantity[key] * INGREDIENT_PRICES[key];
  });
  return newPrice;
};

const initialState = {
  ingredients: null,
  ingredientsQuantity: null,
  totalPrice: 4.0,
  error: false,
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.ADD_INGREDIENT]: () => {
      const newIngredients = [...state.ingredients];
      newIngredients.push(action.igName);

      const ingredientsQuantity = { ...state.ingredientsQuantity };
      ingredientsQuantity[action.igName]++;

      const newPrice = calculatePrice(ingredientsQuantity);

      return {
        ...state,
        ingredients: newIngredients,
        ingredientsQuantity,
        totalPrice: newPrice,
      };
      //this.updatePurchaseState(newIngredients);
    },

    [actionTypes.REMOVE_INGREDIENT]: () => {
      const ingredientsQuantity = { ...state.ingredientsQuantity };
      if (ingredientsQuantity[action.igName] > 0) {
        const newIngredients = [...state.ingredients];
        const igIndex = newIngredients.lastIndexOf(action.igName);
        newIngredients.splice(igIndex, 1);

        ingredientsQuantity[action.igName]--;

        const newPrice = calculatePrice(ingredientsQuantity);

        return {
          ...state,
          ingredients: newIngredients,
          ingredientsQuantity,
          totalPrice: newPrice,
        };
        //this.updatePurchaseState(newIngredients);
      }
    },

    [actionTypes.SET_INGREDIENTS]: () => {
      const {
        ingredientsOrder = [],
        ingredientsQuantity,
      } = action.ingredientsInfo;

      const newPrice = calculatePrice(ingredientsQuantity);

      return {
        ...state,
        ingredients: ingredientsOrder,
        ingredientsQuantity,
        totalPrice: newPrice,
        error: false,
      };
    },
    [actionTypes.FETCH_INGREDIENTS_FAILED]: () => {
      return {
        ...state,
        error: true,
      };
    },
  };
  if (actions[action.type]) return actions[action.type]();
  return state;
};

export default reducer;
