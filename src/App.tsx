import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { Nav, Home, SignUp, SignIn, DashBoard, NotFound, history, AddDetail , fecthData } from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  fecthData(dispatch);
  return (
    <div className="App">
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
