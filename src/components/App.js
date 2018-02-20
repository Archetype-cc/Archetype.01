import React, { Component } from 'react';
import Home from './Home';
const {ipcRenderer} = require('electron')


class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
