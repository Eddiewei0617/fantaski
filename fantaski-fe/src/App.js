import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MountainRoute from "./pages/MountainRoute";
import Member from "./pages/Member";
function App() {
  return (
    <Router>
      <>
        <Link to="/mountainRoute"></Link>
        <Link to="/member"></Link>
        <Switch>
          <Route path="/mountainRoute">
            <MountainRoute />
          </Route>
          <Route path="/member">
            <Member />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
