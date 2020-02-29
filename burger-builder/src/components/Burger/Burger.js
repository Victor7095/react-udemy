import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = ({ingredients}) => {
    let transformedIngredients = Object.keys(ingredients)
        .map(ingredientName => {
            return [...Array(ingredients[ingredientName])].map((_, i)=>{
                return <BurgerIngredient key={ingredientName + i} type={ingredientName}></BurgerIngredient>
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
        console.log(transformedIngredients)
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding in some ingredients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default burger