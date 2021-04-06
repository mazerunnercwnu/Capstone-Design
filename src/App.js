import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Height: 0,
      width: 0,
      PlayerPosition:{
        x: 0,
        y: 0
      },
      map:[]
    }
  }
  
  render() {
    return (
      <h1>MazeGame</h1>
    );
  }
}

export default App;
