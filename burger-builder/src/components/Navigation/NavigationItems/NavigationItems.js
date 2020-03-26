import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem to="/" active>Burger Builder</NavigationItem>
        <NavigationItem to="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;