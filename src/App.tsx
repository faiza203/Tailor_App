import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { Nav, Home, SignUp, SignIn, DashBoard, NotFound, history, AddDetail } from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App text-center">
      <Router history={history}>
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/SignIn" component={SignIn}></Route>
          <Route path="/DashBoard" component={DashBoard}></Route>
          <Route path="/AddDetail" component={AddDetail}></Route>
          <Route path="" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
