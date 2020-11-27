import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory as createHistory } from 'history'
import { Home, SignUp , SignIn} from './components/index';
import './App.css';

const history = createHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/SignIn" component={SignIn}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
