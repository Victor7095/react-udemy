import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem to="/">Burger Builder</NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem to="/orders">Orders</NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem to="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem to="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
