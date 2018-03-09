import React, { Component } from 'react';
import styled from 'styled-components';
const { writeDir } = require('electron').remote.require('./lib/filesystem') // bar

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
  font-size: 80px;
  color: #E58E73;
  border: none;
  border-bottom: 1px dashed grey;
  text-align: center;
`

const Cross = styled.button `
  position: absolute;
  right: 5%;
  top: 8%;
  font-size: 40px;
  color: gray;
  cursor: pointer;
  border: none;
  background: rgba(16, 16, 16, 0.05);

`



class Modal extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      showInput: true
    }
  }

  handleChange = (e) => {
   this.setState({ value: e.target.value });
  }

  keyPress = (e) => {
     if(e.keyCode == 13){
        this.setState({
           value: e.target.value,
           showInput: false
          });
          setTimeout(() => { this.props.remove(); }, 3000);

          writeDir(this.state.value)
          foldersRemote

     }
  }

  render(){
    console.log(this.state.value);
    console.log(this.props)
    const { showInput, value } = this.state;

    return (

      <ModalBox  >
        <Cross onClick={() => this.props.remove()} > X </Cross>

        {
          showInput
          ?
          <InputBox type='text' placeholder="Name of your project" value={value} onKeyDown={this.keyPress} onChange={this.handleChange}
          />
          :
          <h1> {value} folder was created in your computer </h1>

        }


      </ModalBox>
    )
  }

}

export default Modal
