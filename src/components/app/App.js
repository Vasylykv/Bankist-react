import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Header from '../header/Header';
import Login from '../Login/Login';
import UserPage from '../UserPage/UserPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/profile">
          <UserPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
