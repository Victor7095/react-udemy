import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = ({ingredients, price, purchaseCanceled, purchaseContinued}) => {
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
            <p><strong>Total price: {price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" clicked={purchaseCanceled}>Cancel</Button>
            <Button type="Success" clicked={purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary