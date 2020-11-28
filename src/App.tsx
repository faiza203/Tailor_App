import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory as createHistory } from 'history'
import { Home, SignUp, SignIn, Nav, NotFound } from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const history = createHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Nav />
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/SignUp" component={SignUp}></Route>
            <Route path="/SignIn" component={SignIn}></Route>
            <Route path="" component={NotFound}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
