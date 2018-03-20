import React, { Component } from 'react';
import styled from 'styled-components';
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {foldersRemote} = require('electron').remote.require('./lib/remote') //
const {syncDat} = require('electron').remote.require('./lib/createTheme') // bar

const {shell} = require('electron');

argv.loc = argv.loc || path.join(userHome, '/Archetype');

const FolderListContainer = styled.div `
  height: 15rem;
  width: 100%;
  position: static;
  overflow: scroll;
`

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

const SyncSpan = styled.button `
  border: none;
  color: pink;
  font-size: 8px;
  padding: 0px;
  margin-top: 0px;
  cursor: pointer;
  float: right;
`


class ArchetypesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders:[]
    }
  }

  openLink = (folder) => (e) => {
    shell.showItemInFolder(`${argv.loc}/${folder}`);
  }

  openWebsite = (dir) => (e) => {
    shell.openExternal(`${dir}`);
  }

  sync = (folder) => (e) => {
    syncDat(folder);
  }

  componentWillMount() {
    foldersRemote.readFolder().then(data => { this.setState({ folders: data })})
  }

  render() {
    const { folders } = this.state;
    console.log(this.state.folders);

    return  (

      <div>
        <p> My Archetypes </p>
        <FolderListContainer>
          <ul>

          {
            folders.map((folder, i) =>  {
              if (folder !== '.DS_Store' && folder !== ".archetype.lock" && folder !== ".dat") {
                return  <FolderLi key={i} >
                <LinkFolder key={i} onClick={this.openLink(folder)}> {folder}  </LinkFolder>
                <SynctoDat key={folder[i]} onClick={this.sync(folder)} > ⟿ </SynctoDat>
                <LinktoDat key={folder} onClick={this.openWebsite("dat://57c19e591cdce8b7287a8f13ac5992ed38e44b272f137797d9039470d9fb4d2c/")} > ⋯ </LinktoDat>
                </FolderLi>
              }
            })
          }

          </ul>
        </FolderListContainer>
      </div>

    )
  }
}

export default ArchetypesList;
