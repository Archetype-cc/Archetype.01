import React, { Component } from 'react';
import styled from 'styled-components';
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {foldersRemote} = require('electron').remote.require('./lib/remote') // bar
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
`

const FolderLi = styled.li `
  cursor: pointer;
`
const LinktoDat = styled.span `
  color: #E58E73;
  font-size: 18px;
  float: right;
  margin-right: 15px;
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

  componentWillMount() {
    foldersRemote.readFolder().then(data => { this.setState({ folders: data })})
  }

  render() {
    // console.log(this.state.folders);
    const { folders } = this.state;

    return  (

      <div>
        <p> My Archetypes </p>
        <FolderListContainer>
          <ul>

          {
            folders.map((folder, i) =>  {
              if (folder !== '.DS_Store' && folder !== ".archetype.lock" && folder !== ".dat") {
                return  <FolderLi >
                <LinkFolder key={folder} onClick={this.openLink(folder)}> {folder} </LinkFolder>
                <LinktoDat onClick={this.openWebsite("dat://57c19e591cdce8b7287a8f13ac5992ed38e44b272f137797d9039470d9fb4d2c/")} > ⋯ </LinktoDat>
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
