import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, Map } from "./pages";
import { PrivateRoute } from "./components";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/maps" component={Map} />
      </Switch>
    </Router>
  );
}
