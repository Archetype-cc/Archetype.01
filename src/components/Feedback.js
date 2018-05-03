import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  width: 100%;
`
const Text = styled.p`
    color: black;
`
const Banner = styled.div`
  text-align: center;
  width: 100%;
  height: 51px;
  position: absolute;
  background: #FF7B7B;
  color: black;
  top: -52px;
  z-index: 2;
`

class Feedback extends Component {
  render() {
    const { logMsg, showLog, logStatus } = this.props;
    let styleBanner = '';
    
    if (logStatus === 'SHOW'){
      styleBanner = 'bannerActived';
    } else if (logStatus === 'HIDE') {
      styleBanner = 'bannerDeactivated';  
    } else {
      styleBanner = ''
    }
    
    return (
      <Container>
        <Banner className={styleBanner}> 
          <Text>{logMsg}</Text> 
        </Banner>
      </Container>

    )
  }
}

export default Feedback;
