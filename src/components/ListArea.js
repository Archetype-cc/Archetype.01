import React, { Component } from 'react';
import styled from 'styled-components';
import ArchetypesList from './ArchetypesList';

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

  &:hover {
    border: 1px solid #E58E73;
    cursor: pointer;
  }
`


class ListArea extends Component {
  render() {
    console.log(this.props);
    return  <DescriptionContainer>

        <Heading>CREATE, SHARE & DISTRIBUTE YOUR OWN ARTWORK.</Heading>
        <Line />
        <ArchetypesList />
        <hr></hr>
        <Button> My Archetype Folder</Button>
        <Button> Archetype Website</Button>
        <Button> Archetype Github</Button>
        <Button> Archetype Github</Button>

      </DescriptionContainer>;
  }
}

export default ListArea;
