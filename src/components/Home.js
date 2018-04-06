import React, { Component } from 'react';
import styled from 'styled-components';
import CreateButton from './CreateButton';
import ListArea from './ListArea';
import Templates from './Templates';
import Modal from './Modal';

import Menu from './Menu';

const {ipcRenderer} = require('electron');


ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
`



class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalName: false,
      showModalHex: false,
      showModal: false,
      name: '',
      hex: '',
      template: ''
    }
  }

  update = (theme) => {
    this.setState({
      showModal: true,
      template: theme,
    })
  }

  remove = () => {
    this.setState({
      showModal: false
    })
  }


  render () {
    const { showModal, template } = this.state;

    return (
      <div>
        <Menu />
        <PageContainer>
        <ListArea click={this.update} />
        {
          showModal
          ?
          <Modal remove={this.remove} template={template} />
          :
          null
        }

        </PageContainer>

      </div>
    )
  }
}

export default Home;
