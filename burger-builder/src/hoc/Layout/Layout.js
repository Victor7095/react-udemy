import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../AuxWrapper/AuxWrapper";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

const Layout = ({isAuthenticated, children}) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible((prevsideDrawerIsVisible) => !prevsideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuthenticated={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        open={sideDrawerIsVisible}
        isAuthenticated={isAuthenticated}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
