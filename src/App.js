import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HOME, DASHBOARD } from "./Routes";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={DASHBOARD}>
            <Dashboard />
          </Route>
          <Route path={HOME}>
            <Home />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
