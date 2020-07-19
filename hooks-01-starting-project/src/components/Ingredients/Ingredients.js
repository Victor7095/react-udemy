import React, { useCallback, useReducer } from "react";
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

const httpReducer = (currentHttp, { type, ...payload }) => {
  const actionTypes = {
    SEND: () => ({ isLoading: true, error: null }),
    RESPONSE: () => ({ isLoading: false, error: null }),
    ERROR: ({ error }) => ({ isLoading: false, error }),
  };

  if (!actionTypes[type]) throw new Error();
  return actionTypes[type](payload);
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
  });

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = (newIngredient) => {
    dispatchHttp({ type: "SEND" });
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
        dispatchHttp({ type: "ERROR", error: err });
      });
  };

  const removeIngredientHandler = (id) => {
    dispatchHttp({ type: "SEND" });
    fetch(`https://react-hooks-c609e.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        clearError();
        dispatch({ type: "DELETE", id });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", error: err });
      });
  };

  const clearError = () => {
    dispatchHttp({ type: "RESPONSE" });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error.message}</ErrorModal>
      )}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.isLoading}
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
