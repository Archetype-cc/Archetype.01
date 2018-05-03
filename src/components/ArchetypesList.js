import React, { Component } from 'react';
import styled from 'styled-components';
import Folder from './Folder';
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {foldersRemote} = require('electron').remote.require('./lib/remote') //
const {syncDat} = require('electron').remote.require('./lib/create') // bar

const FolderListContainer = styled.div `
  height: 15rem;
  width: 100%;
  position: static;
  overflow: scroll;
`

const Ulist = styled.ul`
  line-height: 2.6rem;
`

const Titlep = styled.div `
  margin-top: 55px;
  margin-bottom: 10px;
`

class ArchetypesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: []
    }
  }

  componentWillMount() {
    foldersRemote.readFolder().then(folders =>  this.setState({ folders }))
  }

  componentWillReceiveProps(nextProps){
    foldersRemote.readFolder().then(folders =>  this.setState({ folders }))
  }

  render() {
    const { folders } = this.state;
    // console.log(this.state.folders);
    const { updateLogMsg } = this.props;
    
    return  (

      <div>
        <Titlep> • My Archetypes </Titlep>
        <FolderListContainer>
          <Ulist>

          {
            folders.map((name, i) =>  {
              if (name !== '.DS_Store' && name !== ".archetype.lock" && name !== ".dat" && name !== "feed.json") {
                return  <Folder key={i} folderName={name} port={i*1000} updateLogMsg={updateLogMsg}/>
              }
            })
          }

        </Ulist>
        </FolderListContainer>
      </div>

    )
  }
}

export default ArchetypesList;
