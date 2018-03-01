import React, { Component } from 'react';
import styled from 'styled-components';
const {ipcRenderer} = require('electron');

const DescriptionContainer = styled.div `
  flex : 1;
  padding: 20px;
`;

create = () => {
  this.setState({
    showModalName: true
  })
}

ask = () => {
  this.setState({
    showModalHex: true
  })
}

project = () => {
  console.log(ipcRenderer.sendSync('create-project', 'project')) // prints "pong"
}

onNameChange = (event) => {
  this.setState({
    name: event.target.value
  })
}

onHexChange = (event) => {
  this.setState({
    hex: event.target.value
  })
}

saveName = () =>  {
  const { name } = this.state;

  ipcRenderer.sendSync('create-event', name) // prints "pong"

  this.setState({
    showModalName: false,
    name: ""
  })

}


sendHex = () =>  {
  const { hex } = this.state;

  ipcRenderer.sendSync('ask-hex', hex)

  this.setState({
    showModalHex: false,
    hex: ""
  })

}

class TemplateArea extends Component {
  render() {
    constructor(props){
      super(props);
      this.state = {
        showModalName: false,
        showModalHex: false,
        name: '',
        hex: ''
      }
    }
    const { showModalName, showModalHex, name, hex } = this.state;

    return (
      <div>
        <DescriptionContainer>

          {
            showModalName
            ?
            <ModalName onNameChange={this.onNameChange} name={name} save={this.saveName}/>
            :
            null
          }
          {
            showModalHex
            ?
            <ModalHex onHexChange={this.onHexChange} hex={hex} send={this.sendHex}/>
            :
            null
          }
          <a href="dat://dd1f8f9251180a790281b60085174ecad45320e7284362f3c027804db28965f5/">Dat</a>
          <CreateButton text="Create" click={this.create}/>
          <CreateButton text="Version" click={this.ask}/>

        </DescriptionContainer>
      </div>

    )
  }
}

export default TemplateArea;

// Modal
const ModalName = ({ onNameChange, name, save }) =>
 <div style={{ position: 'absolute', background: 'grey' }}>
   <h4>Put your name</h4>
   <input type='text' onChange={onNameChange} value={name} />
   <button onClick={save} >Save</button>
 </div>

const ModalHex = ({ onHexChange, hex, send }) =>
<div style={{ position: 'absolute', background: 'grey' }}>
  <h4>Put the dat hex here</h4>
  <input type='text' onChange={onHexChange} value={hex} />
  <button onClick={send} >Send</button>
</div>
