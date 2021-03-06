import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
const { createTheme, createFiles, cloneFolder } = require('electron').remote.require('./lib/create') //
const { foldersRemote } = require('electron').remote.require('./lib/remote') //

const ModalBox = styled.div `
  position: fixed;
  background: rgba(16, 16, 16, 0.99);
  width: 100vw;
  height: 100vh;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.input `
  width: 70%;
  background-color: rgba(16, 16, 16, 0.05);
  height: 50px;
  padding: 20px;
  font-size: 40px;
  color: #E58E73;
  border: none;
  border-bottom: 1px dashed grey;
  text-align: center;
`

const Cross = styled.button `
  position: absolute;
  right: 5%;
  top: 8%;
  font-size: 25px;
  color: gray;
  cursor: pointer;
  border: none;
  background: rgba(16, 16, 16, 0.05);
`

const Name = styled.span `
  color: #E58E73
`

const SuccessMSG = styled.h1`
  padding: 40px;
  line-height: 42px;
`

const ExistingFolder = styled.div `
  position: absolute;
  margin-top: 100px;
`

class Modal extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      showInput: true,
      newFolder: true,
      template: this.props.template,
      files: this.props.files,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      template: nextProps.template,
      files: nextProps.files
    })
  }

  handleChange = (e) => {
   this.setState({
     value: _.capitalize(e.target.value),
     newFolder: true
    });
  }

  keyPress = (e) => {
     if(e.keyCode == 13){

        this.setState({ value: _.capitalize(e.target.value)});

        foldersRemote.readFolder().then(data => {
          if(data.includes(this.state.value)){
            // console.log('this folder exists');
            this.setState({
              newFolder: false
            });
          } else if(this.state.files.length > 0){
            createTheme(this.state.value, this.state.template).then(createFiles(this.state.value, this.state.template,this.state.files));
            this.setState({
               showInput: false,
               newFolder: true
            });
            setTimeout(() => { this.props.remove(); }, 1500);
          } else {
            console.log(this.state.value, this.state.template);
            createTheme(this.state.value, this.state.template).then(createFiles(this.state.value, this.state.template));
            this.setState({
               showInput: false,
               newFolder: true
            });
            setTimeout(() => { this.props.remove(); }, 1500);
          }
        })

     }
  }

  render(){

    const { showInput, value, newFolder, template, files } = this.state;

console.log(files);

    return (

      <ModalBox  >
        <Cross onClick={() => this.props.remove()} > X </Cross>

        {
          showInput
          ?
          <InputBox type='text' placeholder="Name of your project" value={value} onKeyDown={this.keyPress} onChange={this.handleChange}
          />
          :
          <SuccessMSG> <Name>{value}</Name> folder was created in your computer with a DAT LINK. </SuccessMSG>

        }

        {
          newFolder
          ?
          null
          :
          <ExistingFolder>
            <p> This Folder Exists </p>
          </ExistingFolder>
        }


      </ModalBox>
    )
  }

}

export default Modal
