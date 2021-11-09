// import "./App.css";
import Navbar from "./components/share/Navbar";
import Footer from "./components/share/Footer";
import Gotop from "./components/share/Gotop";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// 引入各分頁(後續寫程式可更動)
import Home from "./pages/Home";
import Course from "./pages/Course";
import Mountain from "./pages/Mountain";
import Product from "./pages/Product";
import Forum from "./pages/Forum";
import Order from "./pages/Order";
import Login from "./pages/Login";

// footer 相關連結
import Aboutus from "./pages/footer/Aboutus";
import Joinus from "./pages/footer/Joinus";
import Terms from "./pages/footer/Terms";
import Servicepolicy from "./pages/footer/Servicepolicy";
import Privacy from "./pages/footer/Privacy";

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Gotop />
        <Switch>
          {/* footer */}
          {/* 有時間在處理 */}
          {/* <Route path="/privacy" exact>
            <Privacy />
          </Route>
          <Route path="/servicepolicy" exact>
            <Servicepolicy />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
          <Route path="/joinus" exact>
            <Joinus />
          </Route>
          <Route path="/aboutus" exact>
            <Aboutus />
          </Route> */}

          {/* switch 最後在所有網頁切版完在設定 */}

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
        <Footer />
      </>
    </Router>
  );
}

export default App;
