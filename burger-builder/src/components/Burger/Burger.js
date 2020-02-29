import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = ({ingredients}) => {
    const transformedIngredients = Object.keys(ingredients)
        .map(ingredientName => {
            return [...Array(ingredients[ingredientName])].map((_, i)=>{
                return <BurgerIngredient key={ingredientName + i} type={ingredientName}></BurgerIngredient>
            })
        });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default burger