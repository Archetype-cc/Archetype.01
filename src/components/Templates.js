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


class Templates extends Component {


  render() {

    return (
      <DescriptionContainer>
        <Heading>Choose an Archetype </Heading>

        <Theme click={() => this.props.click("photo")} type={"photo"} />
        <Theme click={() => this.props.click("slides")} type={"slides"}/>
        <Theme click={() => this.props.click("music")} type={"music"} />
        <Theme click={() => this.props.click("slides")} type={"slides"}/>
        <Theme click={() => this.props.click("music")} type={"music"} />
        <Theme click={() => this.props.click("photo")} type={"photo"} />

      </DescriptionContainer>
    )
  }
}

export default Templates;
