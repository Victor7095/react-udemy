import React, { useState, useCallback, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = (newIngredient) => {
    setIsLoading(true);
    fetch("https://react-hooks-c609e.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(newIngredient),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((body) => {
        clearError();
        dispatch({
          type: "ADD",
          newIngredient: { id: body.name, ...newIngredient },
        });
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const removeIngredientHandler = (id) => {
    setIsLoading(true);

    fetch(`https://react-hooks-c609e.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        clearError();
        dispatch({ type: "DELETE", id });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error.message}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onFilterIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
