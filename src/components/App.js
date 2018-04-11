import React, { Component } from 'react';
import Home from './Home';
const {ipcRenderer} = require('electron')
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    background: #0B0D0B;
    color: white;
    font-family: "Lars", arial;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.06em;
    -webkit-text-size-adjust: 100%;
  }

  .tooltip {
    text-align: center;
    background: #E58E73;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 28px;
    line-height: 45px;
  }

  li:hover {
    background: #171817;
  }

  *:focus {outline:0;}

  ::-webkit-scrollbar {
    width: 10px;
    background-color: rgb(15, 15, 15);
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    box-shadow: 0 0 0 12px rgb(49, 49, 49) inset;
  }

  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:focus {
    box-shadow: 0 0 0 12px rgb(89, 89, 89) inset;
  }
  ::-webkit-scrollbar-thumb:active {
    box-shadow: 0 0 0 12px rgb(169, 169, 169) inset;
  }
  ::-webkit-scrollbar-corner {
    background: #0c0c0c;
  }
  @keyframes fadeInOpacity {
  	0% {
  		opacity: 0;
  	}
  	100% {
  		opacity: 1;
  	}
  }

  .dropzone {
    -webkit-flex: 1 auto;
    -ms-flex: 1 auto;
    flex: 1 auto;
    width: 44%;
    padding-bottom: 12px;
  }

  .dropbtn {
    padding-bottom: 20px;
    float: right;
  }

  .dropzone:hover {
    cursor: pointer;
  }

`;


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
