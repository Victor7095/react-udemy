import React from "react";
import classes from "./BurguerIngredient.module.css";

const burgerIngredient = ({type}) => {
    const ingredientChoices = {
        "bread-bottom": <div className={classes.BreadBottom}></div>,
        "bread-top": <div className={classes.BreadTop}>
            <div> className={classes.Seeds1}</div>
            <div> className={classes.Seeds2}</div>
        </div>,
        "meat": <div className={classes.Meat}></div>,
        "cheese": <div className={classes.Chesse}></div>,
        "bacon": <div className={classes.Bacon}></div>,
        "salad": <div className={classes.Salad}></div>
    };

    return ingredientChoices[type];
};

export default burgerIngredient;