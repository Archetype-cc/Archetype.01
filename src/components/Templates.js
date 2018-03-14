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

class Templates extends Component {


  render() {

    return (
      <DescriptionContainer>
        <Heading>Choose an Archetype or Fork? a Website. </Heading>
        <ImportInput type="text" placeholder="dat://2es4w56sd6dff...."/>
        <Theme click={() => this.props.click("photo")} type={"photo"} name={"Another Photo Grid Theme"}/>
        <Theme click={() => this.props.click("slides")} type={"slides"} name={"Slidezz"}/>
        <Theme click={() => this.props.click("music")} type={"music"}  name={"Sound"}/>
        <Theme click={() => this.props.click("slides")} type={"slides"} name={"Slides BB."}/>
        <Theme click={() => this.props.click("music")} type={"music"} name={"Music BB."} />
        <Theme click={() => this.props.click("photo")} type={"photo"} name={"Photo BB."} />

      </DescriptionContainer>
    )
  }
}

export default Templates;
