import React, { Component } from 'react';
import styled from 'styled-components';
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {foldersRemote} = require('electron').remote.require('./lib/remote') //
const {syncDat, startLocalServer, stopLocalServer} = require('electron').remote.require('./lib/createTheme') // bar

const {shell} = require('electron');


argv.loc = argv.loc || path.join(userHome, '/Archetype');



const SpanSync = styled.span `
  color: grey;
  font-size: 16px;
`

const LinkFolder = styled.a `
  font-size: 28px;
  color: white;
  margin-bottom: 40px;
  text-decoration: none;
  cursor: pointer;

`

const FolderLi = styled.li `
  cursor: auto;
`
const LinktoDat = styled.span `
  color: #E58E73;
  font-size: 18px;
  float: right;
  margin-right: 15px;
  cursor: pointer;
`

const SynctoDat = styled.span `
  color: grey;
  font-size: 18px;
  float: right;
  margin-right: 15px;
  cursor: pointer;
`

const Preview = styled.span `
  color: grey;
  font-size: 18px;
  float: right;
  margin-right: 15px;
  cursor: pointer;
`

const SyncSpan = styled.button `
  border: none;
  color: pink;
  font-size: 8px;
  padding: 0px;
  margin-top: 0px;
  cursor: pointer;
  float: right;
`

class Folder extends Component {
  constructor(props){
    super(props);
    this.state = {
      serving: false,
      color: 'grey'
    }
  }

  openLink = () => {
    const { folderName } = this.props;
    shell.showItemInFolder(`${argv.loc}/${folderName}`);
  }

  openWebsite = () => {
    const { folderName } = this.props;

    shell.openExternal(folderName);
  }

  sync = () => {
    const { folderName } = this.props;
    syncDat(folderName);
  }

  preview = () => {
    const { folderName, port } = this.props;

    let serving;
    let color;
    if(this.state.serving){
      stopLocalServer();
      serving = false;
      color = 'grey';
    } else {
      startLocalServer(folderName, port);
      serving = true;
      color = '#E58E73';
      shell.openExternal(`http://localhost:5555/${folderName}/index.html`);
    }

    this.setState({ serving, color })
  }

  render() {
    const { folderName } = this.props;

    return (
      <div>
        <LinkFolder onClick={this.openLink}> {folderName}  </LinkFolder>
        <SynctoDat onClick={this.sync} > ⟿ </SynctoDat>
        <Preview onClick={this.preview} style={{color:this.state.color}} > ∴ </Preview>
        <LinktoDat onClick={this.openWebsite("dat://57c19e591cdce8b7287a8f13ac5992ed38e44b272f137797d9039470d9fb4d2c/")} > ⋯ </LinktoDat>
      </div>
    )
  }
}

export default Folder;
