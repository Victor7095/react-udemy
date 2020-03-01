import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        const {ingredients} = this.state;
        return (
            <Aux>
                <Burger ingredients={ingredients}/>
                <BuildControls/>
            </Aux>
        );
    }
}

export default BurgerBuilder;