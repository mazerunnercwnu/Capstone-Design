import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Main'
import Signup from './Signup'
import Login from './Login'
import Maker from './Maker'
import Player from './Player'
import Cir from './Loading'
import './Style/App.css'

function App() {
  return (
    <BrowserRouter> 
        <Switch>
          <Route path = '/login' component = {Login}/> 
          <Route path = '/signup' component = {Signup}/>
          <Route path = '/maker' component = {Maker}/>
          <Route path = '/player/:map_id' component = {Player}/> 
          <Route path = '/' component = {Main}/>
       </Switch>
    </BrowserRouter>
  );
}

export default App;