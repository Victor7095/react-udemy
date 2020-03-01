import React from "react";

import Aux from "../../../hoc/Aux";

const orderSummary = ({ingredients}) => {
    const ingredientSummary = Object.keys(ingredients)
        .map(igName => (
            <li key={igName}>
                <span style={{textTransform:'capitalize'}}>{igName}</span>
                : {ingredients[igName]}
            </li>
            ));
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger withh thhe following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
}

export default orderSummary