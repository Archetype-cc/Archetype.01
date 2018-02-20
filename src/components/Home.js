import React, { Component } from 'react';
import styled from 'styled-components';
import CreateButton from './CreateButton';
const {ipcRenderer} = require('electron')


ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})

const TitleA = styled.h1 `
  font-size: 50px;
  color: #d0bc96;
  padding: 20px;
`

let metadata = {
  name: "name"
}

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      name: ''
    }
  }


  create = () => {
    this.setState({
      showModal: true
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

  saveName = () =>  {
    const { name } = this.state;

    ipcRenderer.sendSync('create-event', name) // prints "pong"

    this.setState({
      showModal: false,
      name: ""
    })

  }

  render () {
    const { showModal, name } = this.state;

    return (
      <div>
        <TitleA> Archetype </TitleA>
        {
          showModal
          ?
          <Modal onNameChange={this.onNameChange} name={name} save={this.saveName}/>
          :
          null
        }
        <a href="dat://dd1f8f9251180a790281b60085174ecad45320e7284362f3c027804db28965f5/">Dat</a>
        <CreateButton text="Create" click={this.create}/>
{/*        <CreateButton text="project" click={this.project}  />
        <CreateButton text="stop" click={this.stop}  />
*/}
      </div>
    )
  }
}

export default Home;


// Modal
const Modal = ({ onNameChange, name, save }) =>
 <div style={{ position: 'absolute', background: 'grey' }}>
   <h4>Put your name</h4>
   <input type='text' onChange={onNameChange} value={name} />
   <button onClick={save} >Save</button>
 </div>
