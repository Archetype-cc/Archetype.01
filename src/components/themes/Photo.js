import React, { Component } from 'react';
import styled from 'styled-components';
import { ThemeBox } from '../Styles';
import Them2 from './static/web2.png';


class Photo extends Component {
  render() {
    return (
      <ThemeBox>
        <div onClick={() => this.props.click()}>
        <img src={Them2} style={{maxHeight:'297px', width:"100%", padding: "0", filter: "grayscale(100%)"}} />
        </div>

      </ThemeBox>
    )
  }
}

export default Photo;
