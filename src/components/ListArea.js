import React, { Component } from 'react';
import styled from 'styled-components';
import ArchetypesList from './ArchetypesList';
const path = require('path');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {shell} = require('electron');
argv.loc = argv.loc || path.join(userHome, '/Archetype');

const DescriptionContainer = styled.div `
  flex : 1;
  padding: 20px;
`

const Heading = styled.h1 `
  font-size: 45px;
  color: #white;
  padding: 35px 10px 10px 10px;
  width: 95%;
`

const Line = styled.div `
  height: 0.3px;
  width: 100%;
  background: white;
`

const Button = styled.button `
  background: none;
  border: 1px solid white;
  color: white;
  margin: 40px 5px 40px 5px;
  float: left;
  padding: 10px;
  width: 120px;

  &:hover {
    border: 1px solid #E58E73;
    cursor: pointer;
  }
`


class ListArea extends Component {
  openLink = (e) => {
    shell.showItemInFolder(`${argv.loc}`);
  }

  openWebsite = (e) => {
    shell.openExternal(`http://www.archetype.cc`);
  }

  render() {
    return  <DescriptionContainer>

        <Heading>CREATE, EXHIBIT & SHARE YOUR ARTWORK.</Heading>
        <Line />
        <ArchetypesList />
        <hr></hr>
        <Button onClick={this.openLink}> My Archetypes </Button>
        <Button onClick={this.openWebsite}> Archetype.cc </Button>
        <Button> Help & FAQ</Button>
        <Button> Developers </Button>

      </DescriptionContainer>;
  }
}

export default ListArea;
