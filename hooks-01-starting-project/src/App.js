import React, { useContext } from "react";

import Auth from "./components/Auth";
import { AuthContext } from "./context/auth-context";
import Ingredients from "./components/Ingredients/Ingredients";

const App = (props) => {
  const authContext = useContext(AuthContext);

  if (authContext.isAuth) {
    return <Ingredients />;
  }
  return <Auth />;
};

export default App;
