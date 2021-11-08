import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MountainRoute from "./pages/MountainRoute";
import Member from "./pages/Member";
function App() {
  return (
    <Router>
      <>
        <Link to="/MountainRoute"></Link>
        <Link to="/Member"></Link>
        <Switch>
          <Route path="/MountainRoute">
            <MountainRoute />
          </Route>
          <Route path="/Member">
            <Member />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
