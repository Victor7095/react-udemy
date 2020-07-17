import React, { useState, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
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
        setIngredients((oldIngredients) => [
          ...oldIngredients,
          { id: body.name, ...newIngredient },
        ]);
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
        setIngredients((oldIngredients) =>
          oldIngredients.filter((ig) => id !== ig.id)
        );
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
        <Search
          onFilterIngredients={filteredIngredientsHandler}
        />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
