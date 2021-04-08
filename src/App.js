import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      height: 0,
      width: 0,
      map:[],
      mod:{
        obs: 0,
        start: 0,
        end: 0
      }
    }
  }

  
  
  render() {
    return (
      <h1>MazeGame</h1>
    );
  }
}

export default App;
