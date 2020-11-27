import React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory as createHistory } from 'history'
import { Home } from './components/index';
import './App.css';

const history = createHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;
