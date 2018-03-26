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

const Ulist = styled.ul `
  line-height: 2.6rem;
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
    console.log("hitting")
    foldersRemote.readFolder().then(folders =>  this.setState({ folders }))
  }

  render() {
    const { folders } = this.state;
    // console.log(this.state.folders);

    return  (

      <div>
        <p> My Archetypes </p>
        <FolderListContainer>
          <Ulist>

          {
            folders.map((name, i) =>  {
              if (name !== '.DS_Store' && name !== ".archetype.lock" && name !== ".dat") {
                return  <Folder key={i} folderName={name} port={i*1000} />
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
