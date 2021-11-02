import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Router>
      <>
        <Link to="/ProductList"></Link>

        <Switch>
          <Route path="/ProductList">
            <ProductList />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
