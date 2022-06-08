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
import MainPage from '../MainPage/MainPage';

function App() {
  // const { user: currentUser } = useSelector((state) => state.auth);
  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/profile">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

{
  /* <Router>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <main className="app">
          <Balance />
          <Movements />
          <Summary />
          <Operations />
          <Timer />
        </main>
      </Route>
    </Router> */
}
