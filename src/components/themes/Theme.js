import React, { Component } from 'react';
import styled from 'styled-components';
import { ThemeBox } from '../Styles';
import Them3 from './static/web3.jpg';
import Them2 from './static/web2.png';
import Them1 from './static/photo.png';
import Switch, { Case, Default } from 'react-switch-case';

const ThemeImage = styled.img `
  max-height: 297;
  width: 100%;
  padding: 0;
  filter: "grayscale(100%)";
  border: 5px solid white;
  margin-bottom: 30px;

  &:hover {
    border: 5px solid #E58E73;

  }
`

class Theme extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: this.props.type,
    }
  }

  render() {
    const { type } = this.state;
    let componentShow = type;

    return (
      <ThemeBox>
        <div onClick={() => this.props.click()}>
        <Switch condition={componentShow}>
          <Case value={'slides'}>
            <p> {type} </p>
            <ThemeImage src={Them3}  />
          </Case>
          <Case value={'music'}>
            <p> {type} </p>
            <ThemeImage src={Them2} />
          </Case>
          <Case value={'photo'}>
            <p> {type} </p>
            <ThemeImage src={Them1} />
          </Case>
        </Switch>

        </div>



      </ThemeBox>
    )
  }
}

export default Theme;
