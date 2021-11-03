import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <>
        <Link tp="/Products"></Link>

        <Switch>
          <Route path="/products">
            <Products />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
