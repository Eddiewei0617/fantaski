import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
import Products from "./pages/Products";
// import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <>
        <Link to="/Products"></Link>
        {/* <Link to="/Orders"></Link> */}
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          {/* <Route path="/Orders">
            <Orders />
          </Route> */}
        </Switch>
      </>
    </Router>
  );
}

export default App;
