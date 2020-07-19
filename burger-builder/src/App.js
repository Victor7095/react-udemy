import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions/";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const App = ({ onTryAutoSignup, isAuthenticated }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={(props) => <Checkout {...props}/>} />
        <Route path="/orders" component={(props) => <Orders {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapActionsToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
