import React, { Component } from 'react';
import styled from 'styled-components';
import Theme from './themes/Theme';

const DescriptionContainer = styled.div `
  flex : 1;
  padding: 20px;
  overflow: scroll;

`

const Heading = styled.h1 `
  font-size: 14px;
  color: #white;
  padding-top: 60px;
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

const More = styled.div `
  padding-top: 3rem;
`




class Templates extends Component {
  constructor(props){
    super(props);
    this.state = {
      template: "",
      showInput: true,
      newFolder: true,
    }
  }


  handleChange = (e) => {
   this.setState({
     template: e.target.value,
     newFolder: true
    });
  }

  keyPress = (e) => {
     if(e.keyCode == 13){

        this.setState({ value: e.target.value});
        this.props.click(this.state.template);

     }
  }

  render() {

    return (
      <DescriptionContainer>
        <Heading>Choose an Archetype or Fork a Website you like. </Heading>
        <ImportInput type="text" placeholder="To fork paste a dat link here. Ex. dat://2es4w56sd6dff...." template={this.state.template} onKeyDown={this.keyPress} onChange={this.handleChange}/>
        <Theme click={() => this.props.click("photo")} type={"photo"} name={"Another Photo Grid Theme"}/>
        <Theme click={() => this.props.click("slides")} type={"slides"} name={"Slidezz"}/>
      </DescriptionContainer>
    )
  }
}

export default Templates;
