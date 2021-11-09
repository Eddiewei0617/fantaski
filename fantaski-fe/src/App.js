import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
import Products from "./pages/product/Products";
import Orders from "./pages/order/Orders";

function App() {
  return (
    <Router>
      <>
        <Link to="/">這是首頁</Link>
        <br />
        <Link to="/Products">到商品頁</Link>
        <br />
        <Link to="/Orders">到購物車</Link>
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/Orders">
            <Orders />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
