import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuider";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </Layout>
  );
}

export default App;
