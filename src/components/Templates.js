import React, { Component } from 'react';
import styled from 'styled-components';
import Music from './themes/Music';
import Photo from './themes/Photo';
import Slides from './themes/Slides';

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


class Templates extends Component {


  render() {

    return (
      <DescriptionContainer>
        <Heading>Choose an Archetype </Heading>
        <Slides click={() => this.props.click("slides")} />
        <Music click={() => this.props.click("music")} />
        <Photo click={() => this.props.click("photo")} />
        <Photo click={() => this.props.click("photo")} />
        <Slides click={() => this.props.click("slides")} />
        <Music click={() => this.props.click("music")} />

      </DescriptionContainer>
    )
  }
}

export default Templates;
