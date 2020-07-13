import * as actionTypes from "./actionTypes";

export const addIngredient = (igName) => {
  return { type: actionTypes.ADD_INGREDIENT, igName };
};

export const removeIngredient = (igName) => {
  return { type: actionTypes.REMOVE_INGREDIENT, igName };
};

export const removeIngredientByIndex = (igIndex) => {
  return { type: actionTypes.REMOVE_INGREDIENT_BY_INDEX, igIndex };
};

export const setIngredients = (ingredientsInfo) => {
  return { type: actionTypes.SET_INGREDIENTS, ingredientsInfo };
};

export const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return { type: actionTypes.INIT_INGREDIENTS };
};
