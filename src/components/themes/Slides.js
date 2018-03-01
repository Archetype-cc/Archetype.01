import React, { Component } from 'react';
import styled from 'styled-components';
import { ThemeBox } from '../Styles';
import Them3 from './static/web3.jpg';


class Slides extends Component {
  render() {
    return (
      <ThemeBox>
        <div onClick={() => this.props.click()}>
        <img src={Them3} style={{maxHeight:'297px', width:"100%", padding: "0", filter: "grayscale(100%)"}} />
        </div>

      </ThemeBox>
    )
  }
}

export default Slides;
