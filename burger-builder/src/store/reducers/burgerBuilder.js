import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

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
  building: false,
};

const addIngredient = (state, action) => {
  const newIngredients = [...state.ingredients];
  newIngredients.push(action.igName);

  const ingredientsQuantity = { ...state.ingredientsQuantity };
  ingredientsQuantity[action.igName]++;

  const newPrice = calculatePrice(ingredientsQuantity);

  return updateObject(state, {
    ingredients: newIngredients,
    ingredientsQuantity,
    totalPrice: newPrice,
    building: true,
  });
  //this.updatePurchaseState(newIngredients);
};

const removeIngredient = (state, action) => {
  const ingredientsQuantity = { ...state.ingredientsQuantity };
  if (ingredientsQuantity[action.igName] > 0) {
    const newIngredients = [...state.ingredients];
    const igIndex = newIngredients.lastIndexOf(action.igName);
    newIngredients.splice(igIndex, 1);

    ingredientsQuantity[action.igName]--;

    const newPrice = calculatePrice(ingredientsQuantity);

    return updateObject(state, {
      ingredients: newIngredients,
      ingredientsQuantity,
      totalPrice: newPrice,
      building: true,
    });
    //this.updatePurchaseState(newIngredients);
  }
};

const removeIngredientByIndex = (state, action) => {
  const ingredientsQuantity = { ...state.ingredientsQuantity };
  const newIngredients = [...state.ingredients];
  const igIndex = action.igIndex;
  const igName = newIngredients[igIndex];
  
  newIngredients.splice(igIndex, 1);
  ingredientsQuantity[igName]--;

  const newPrice = calculatePrice(ingredientsQuantity);

  return updateObject(state, {
    ingredients: newIngredients,
    ingredientsQuantity,
    totalPrice: newPrice,
    building: true,
  });
};

const setIngredients = (state, action) => {
  const { ingredientsOrder = [], ingredientsQuantity } = action.ingredientsInfo;

  const newPrice = calculatePrice(ingredientsQuantity);

  return updateObject(state, {
    ingredients: ingredientsOrder,
    ingredientsQuantity,
    totalPrice: newPrice,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) =>
  updateObject(state, {
    error: true,
  });

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.ADD_INGREDIENT]: () => addIngredient(state, action),

    [actionTypes.REMOVE_INGREDIENT]: () => removeIngredient(state, action),

    [actionTypes.REMOVE_INGREDIENT_BY_INDEX]: () =>
      removeIngredientByIndex(state, action),

    [actionTypes.SET_INGREDIENTS]: () => setIngredients(state, action),

    [actionTypes.FETCH_INGREDIENTS_FAILED]: () =>
      fetchIngredientsFailed(state, action),
  };

  if (actions[action.type]) return actions[action.type]();
  return state;
};

export default reducer;
