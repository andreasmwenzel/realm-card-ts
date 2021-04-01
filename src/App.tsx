import React from 'react';

// import './App.css';
import 'semantic-ui-css/semantic.min.css'

import LandingPage from "./components/LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserProvider from './realm/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
