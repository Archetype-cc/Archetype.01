import React, { Component } from 'react';
import styled from 'styled-components';
import { ThemeBox } from '../Styles';
import Them1 from './static/photo.png';

class Music extends Component {
  render() {
    return (
      <ThemeBox>
      <div onClick={() => this.props.click()} >
        <img src={Them1} style={{maxHeight:'297px', width:"100%", padding: "0", filter: "grayscale(100%)"}} />
      </div>

      </ThemeBox>
    )
  }
}

export default Music;
