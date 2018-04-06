import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex1 } from './Styles';

const MenuContainer = styled.div `
  height: 50px;
  position: absolute;
  width: 100vw;
  background-color: #0B0D0B;
  margin: 0;
  z-index: 1;
  -webkit-app-region: drag;


`;

const TitleA = styled.h1 `
  font-size: 12px;
  color: #white;
  padding: 10px;
  text-align: right;
`

class Menu extends Component {

  render(){

    return (
      <div>
        <MenuContainer>
        <Flex1 style={{paddingLeft: '20px'}} >
        </Flex1>
        <Flex1 style={{textAlign: 'center'}}>

        </Flex1>
        <Flex1 style={{textAlign: 'right', paddingRight: '10px'}}>
        <TitleA> Archetype 01.</TitleA>
        </Flex1>
        <hr></hr>

        </MenuContainer>
      </div>
    )
  }

}

export default Menu
