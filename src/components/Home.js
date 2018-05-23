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
      logMsg: '',
      logStatus: 'OFF',
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

  updateLogMsg = (logMsg, logStatus) => {
    this.setState({ logMsg, logStatus });
    // setTimeout(() => { this.updateLogMsg('', 'HIDE') } , 2000);
  }

  render () {
    const { showModal, template, files, logMsg, logStatus} = this.state;

    return (
      <div>
        <Menu logMsg={logMsg} logStatus={logStatus} />
        <PageContainer>
        <ListArea click={this.update} fileImport={this.onDrop} updateLogMsg={this.updateLogMsg}/>
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
