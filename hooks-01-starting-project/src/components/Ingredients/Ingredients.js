import React, { useCallback, useReducer, useMemo, useEffect } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, { type, ...payload }) => {
  const actionTypes = {
    SET: ({ ingredients }) => ingredients,
    ADD: ({ newIngredient }) => [...currentIngredients, newIngredient],
    DELETE: ({ id }) => currentIngredients.filter((ig) => id !== ig.id),
  };

  if (!actionTypes[type]) throw new Error();
  return actionTypes[type](payload);
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [isLoading, error, data, sendRequest, reqExtra, identifier, clear] = useHttp();

  useEffect(() => {
    if (!isLoading && !error && identifier === "REMOVE_INGREDIENT")
      dispatch({ type: "DELETE", id: reqExtra });
    else if (!isLoading && !error && data && identifier === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        newIngredient: { id: data.name, ...reqExtra },
      });
    }
  }, [isLoading, data, reqExtra, identifier, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(
    (newIngredient) => {
      sendRequest(
        `https://react-hooks-c609e.firebaseio.com/ingredients.json`,
        "POST",
        JSON.stringify(newIngredient),
        newIngredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (id) => {
      sendRequest(
        `https://react-hooks-c609e.firebaseio.com/ingredients/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const ingredientsList = useMemo(
    () => (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    ),
    [ingredients, removeIngredientHandler]
  );

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error.message}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onFilterIngredients={filteredIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
}

export default Ingredients;
