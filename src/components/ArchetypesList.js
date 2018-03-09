import React, { Component } from 'react';
import styled from 'styled-components';
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {foldersRemote} = require('electron').remote.require('./lib/remote') // bar

argv.loc = argv.loc || path.join(userHome, '/Archetype');

const FolderList = styled.div `

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


class ArchetypesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders:[]
    }
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
        <FolderList>
          <ul>

          {
            folders.map((folder, i) =>  {
                console.log(folder, i);
              if (folder !== '.DS_Store' && folder !== ".archetype.lock" && folder !== ".dat") {
                return  <li><LinkFolder key={folder} href={`file:///${argv.loc}/${folder}/`} target="_blank"> {folder} </LinkFolder></li>
              }
            })
          }

          </ul>
        </FolderList>
      </div>

    )
  }
}

export default ArchetypesList;
