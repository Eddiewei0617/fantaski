// import "./App.css";
import Navbar from "./components/share/Navbar";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// 引入各分頁(後續寫程式可更動)
import Home from "./pages/Home";
import Course from "./pages/Course";
import Mountain from "./pages/Mountain";
import Product from "./pages/Product";
import Forum from "./pages/Forum";
import Order from "./pages/Order";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <>
        <Navbar />
        {/* switch 最後在所有網頁切版完在設定 */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/forum">
            <Forum />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/mountain">
            <Mountain />
          </Route>
          <Route path="/course">
            <Course />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
