import React, { Component } from 'react';
import styled from 'styled-components';

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

  render(){

    return (

      <ModalBox  >
        <Cross onClick={() => this.props.remove()} > X </Cross>
        <InputBox type='text' placeholder="Name of your project" />
      </ModalBox>
    )
  }

}

export default Modal
