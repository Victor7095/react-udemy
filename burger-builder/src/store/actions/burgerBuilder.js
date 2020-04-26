import * as actionTypes from "./actionTypes";

export const addIngredient = (igName) => {
  return { type: actionTypes.ADD_INGREDIENT, igName };
};

export const removeIngredient = (igName) => {
  return { type: actionTypes.REMOVE_INGREDIENT, igName };
};

