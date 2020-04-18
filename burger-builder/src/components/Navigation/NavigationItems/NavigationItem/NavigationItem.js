import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = ({to, children}) => (
  <li className={classes.NavigationItem}>
    <NavLink to={to} exact activeClassName={classes.active}>
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
