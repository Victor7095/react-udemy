import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (newIngredient) => {
    fetch(
      "https://react-hooks-c609e.firebaseio.com/ingredients.json?apiKey=AIzaSyAijVUrsKW3EUpw_K11N2L0-dMyoGhjsYA",
      {
        method: "POST",
        body: JSON.stringify(newIngredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        setIngredients((oldIngredients) => [
          ...oldIngredients,
          { id: body.name, ...newIngredient },
        ]);
      });
  };

  const removeIngredientHandler = (id) => {
    setIngredients((oldIngredients) =>
      oldIngredients.filter((ig) => id !== ig.id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
