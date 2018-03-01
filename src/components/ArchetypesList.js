import React, { Component } from 'react';
import styled from 'styled-components';
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));

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

fs.readdir(argv.loc, (e, archeFolders) => {
  archeFolders.forEach(f => {
    if (f !== '.DS_Store' && f !== ".archetype.lock" && f !== ".dat") {
      console.log(f);
    }
  });
});


class ArchetypesList extends Component {
  render() {
    return  (

      <div>
        <p> My Archetypes </p>
        <FolderList>
          <ul>
            <li> Portfolio  <SpanSync> – Sync </SpanSync> </li>
            <li> Photography Website <SpanSync> – Sync </SpanSync> </li>
            <li> Punk Rock Band <SpanSync style={{color:"#E58E73"}}> – Sync </SpanSync> </li>
            <li> Other Website <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 5 <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 6 <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 7 <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 8 <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 9 <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 10 <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 11 <SpanSync> – Sync </SpanSync> </li>
            <li> Archetype folder 12 <SpanSync> – Sync </SpanSync> </li>
          </ul>
        </FolderList>
      </div>

    )
  }
}

export default ArchetypesList;
