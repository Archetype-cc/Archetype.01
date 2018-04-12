import React, { Component } from 'react';
import styled from 'styled-components';
import CreateButton from './CreateButton';
import ListArea from './ListArea';
import Modal from './Modal';

import Menu from './Menu';


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
      template: '',
      files: []
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
      showModal: false,
      template: ''
    })
  }

  onDrop = (files) => {
    this.setState({
      files
    });
    this.update();
    this.noTemplate();
  }

  noTemplate = () => {
    this.setState({
      template: 'none',
    });
  }

  render () {
    const { showModal, template, files } = this.state;
    return (
      <div>
        <Menu />
        <PageContainer>
        <ListArea click={this.update} fileImport={this.onDrop} />
        {
          showModal
          ?
          <Modal remove={this.remove} template={template} files={files} />
          :
          null
        }

        </PageContainer>
      </div>
    )
  }
}

export default Home;
