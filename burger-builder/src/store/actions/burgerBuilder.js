import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (igName) => {
  return { type: actionTypes.ADD_INGREDIENT, igName };
};

export const removeIngredient = (igName) => {
  return { type: actionTypes.REMOVE_INGREDIENT, igName };
};

export const setIngredients = (ingredientsInfo) => {
  return { type: actionTypes.SET_INGREDIENTS, ingredientsInfo };
};

export const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredientsData.json")
      .then(({ data }) => {
        dispatch(setIngredients(data));
      })
      .catch((err) => dispatch(fetchIngredientsFailed()));
  };
};
