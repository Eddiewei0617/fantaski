import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
import Product from "./pages/Product";

function App() {
  return (
    <Router>
      <>
        <Link to="/product"></Link>

        <Switch>
          <Route path="/product">
            <Product />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
