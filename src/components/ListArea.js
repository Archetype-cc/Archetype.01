import React, { Component } from 'react';
import styled from 'styled-components';
import ArchetypesList from './ArchetypesList';
import CreatePlus from './CreatePlus';
import CreateDrop from './CreateDrop';
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


const HeadingInput = styled.p `
  color: #white;
  margin-bottom: 1px;
  margin-top: 0px;
`

const ImportInput = styled.input `
  border: none;
  border-bottom: 1px solid #949494;
  color: #dd896f;
  width: 100%;
  height: 45px;
  font-size: 14px;
  background: #0b0d0b;
  border-radius: 1px;
  letter-spacing: 0.3px;
`

const Line = styled.div `
  height: 0.3px;
  width: 100%;
  background: white;
`

const Beta = styled.div `
  color: white;
  padding-top: 3rem;
`

const Button = styled.button `
  background: none;
  border: 1px solid white;
  color: white;
  margin: 30px 5px 40px 5px;
  float: left;
  padding: 10px;
  width: 120px;

  &:hover {
    border: 1px solid #E58E73;
    cursor: pointer;
  }
`


class ListArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      template: "",
      showInput: true,
      newFolder: true,
    }
  }

  openLink = (e) => {
    shell.showItemInFolder(`${argv.loc}`);
  }

  openWeb = (url) => {
    shell.openExternal(`${url}`);
  }

  handleChange = (e) => {
   this.setState({
     template: e.target.value,
     newFolder: true
    });
  }

  keyPress = (e) => {
     if(e.keyCode == 13){

        this.setState({
          value: e.target.value,
        });
        this.props.click(this.state.template);
     }
  }

  render() {
    return  <DescriptionContainer>

        <Heading> PUBLISHING AS _______ PRACTICE. </Heading>
        <CreatePlus click={() => this.props.click("starter")} template={this.state.template} type={"new"} />
        <CreateDrop click={() => this.props.click()} fileImport={this.props.fileImport} template={"none"} type={"new"} />
        <Line />
        <ArchetypesList />
        <hr></hr>
        <ImportInput type="text" placeholder="Or fork a dat link here. Ex. dat://2es4w56sd6dff...." template={this.state.template} onKeyDown={this.keyPress} onChange={this.handleChange}/>
        <Button onClick={this.openLink}> My Archetypes </Button>
        <Button onClick={() =>  this.openWeb('https://archetype.cc')}> Archetype.cc </Button>
        <Button onClick={() => this.openWeb('dat://gallery.archetype.cc')}> Gallery </Button>
        <Button onClick={() => this.openWeb('https://github.com/Archetype-cc')}> Developers </Button>

      </DescriptionContainer>;
  }
}

export default ListArea;
