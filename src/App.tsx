import React from "react";

// import './App.css';
import "semantic-ui-css/semantic.min.css";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import AboutPage from "./components/AboutPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./realm/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/signup/">
            <LoginPage initialMode="signup" />
          </Route>
          <Route path="/login">
            <LoginPage initialMode="login" />
          </Route>
          <Route path="/about/" component={AboutPage}></Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
