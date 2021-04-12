import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
import Map from './MapMaker'
import Play from './PlayMaze'
import './App.css'

function App() {
  return (
    <BrowserRouter> 
        <Switch>
          <Route path = '/login' component={Login} /> 
          <Route path = '/signup' component = {Signup}/>
          <Route path = '/maker' component = {Map}/>
          <Route path = '/player' component = {Play}/> 
          <Route path = '/' component={Signup} />
       </Switch>
    </BrowserRouter>
  );
}

export default App;